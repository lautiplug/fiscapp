import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface Notification {
  id: string;
  message: string;
  type: 'warning' | 'info' | 'error';
  dismissible: boolean;
  count?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addOrUpdateNotification: (notification: Omit<Notification, 'id'> & { id?: string }) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  clearReadNotifications: () => void;
  dismissedCounts: Map<string, number>;
  readNotifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [readNotifications, setReadNotifications] = useState<Notification[]>(() => {
    const stored = localStorage.getItem('readNotifications');
    return stored ? JSON.parse(stored) : [];
  });
  const [dismissedCounts, setDismissedCounts] = useState<Map<string, number>>(() => {
    const stored = localStorage.getItem('dismissedNotificationCounts');
    if (stored) {
      const entries = JSON.parse(stored);
      return new Map(entries);
    }
    return new Map();
  });

  useEffect(() => {
    localStorage.setItem('dismissedNotificationCounts', JSON.stringify([...dismissedCounts]));
  }, [dismissedCounts]);

  useEffect(() => {
    localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
  }, [readNotifications]);

  const addOrUpdateNotification = useCallback((notification: Omit<Notification, 'id'> & { id?: string }) => {
    setNotifications(prev => {
      const existingIndex = prev.findIndex(n => n.id === notification.id);

      if (existingIndex >= 0) {
        // Update existing notification
        const updated = [...prev];
        updated[existingIndex] = { ...prev[existingIndex], ...notification, id: notification.id! };
        return updated;
      } else {
        // Add new notification
        const newNotification: Notification = {
          ...notification,
          id: notification.id || crypto.randomUUID(),
        };
        return [...prev, newNotification];
      }
    });
  }, []);

  const removeNotification = useCallback((id: string) => {
    // Store the count when dismissing and move to read notifications
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      if (notification.count !== undefined && notification.count !== null) {
        setDismissedCounts(prev => new Map(prev).set(id, notification.count!));
      }
      setReadNotifications(prev => [...prev, notification]);
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, [notifications]);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const clearReadNotifications = useCallback(() => {
    setReadNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addOrUpdateNotification,
      removeNotification,
      clearAllNotifications,
      clearReadNotifications,
      dismissedCounts,
      readNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
