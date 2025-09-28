import { toast } from "sonner"

export const notifications = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
    })
  },

  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
    })
  },

  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
    })
  },

  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
    })
  },

  loading: (message: string) => {
    return toast.loading(message)
  },

  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    }
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    })
  },
}

export const enterpriseNotifications = {
  added: (enterpriseName: string) => {
    notifications.success(
      "Empresa agregada",
      `${enterpriseName} ha sido agregada exitosamente`
    )
  },

  updated: (enterpriseName: string) => {
    notifications.success(
      "Empresa actualizada",
      `${enterpriseName} ha sido actualizada exitosamente`
    )
  },

  deleted: (enterpriseName: string) => {
    notifications.success(
      "Empresa eliminada",
      `${enterpriseName} ha sido eliminada exitosamente`
    )
  },

  errorAdding: (enterpriseName?: string) => {
    notifications.error(
      "Error al agregar empresa",
      enterpriseName
        ? `No se pudo agregar ${enterpriseName}`
        : "No se pudo agregar la empresa"
    )
  },

  errorUpdating: (enterpriseName?: string) => {
    notifications.error(
      "Error al actualizar empresa",
      enterpriseName
        ? `No se pudo actualizar ${enterpriseName}`
        : "No se pudo actualizar la empresa"
    )
  },

  errorDeleting: (enterpriseName?: string) => {
    notifications.error(
      "Error al eliminar empresa",
      enterpriseName
        ? `No se pudo eliminar ${enterpriseName}`
        : "No se pudo eliminar la empresa"
    )
  },
}

export const inspectionNotifications = {
  added: (inspectionNumber?: string) => {
    notifications.success(
      "Inspección agregada",
      inspectionNumber
        ? `Inspección ${inspectionNumber} agregada exitosamente`
        : "Nueva inspección agregada exitosamente"
    )
  },

  updated: (inspectionNumber?: string) => {
    notifications.success(
      "Inspección actualizada",
      inspectionNumber
        ? `Inspección ${inspectionNumber} actualizada exitosamente`
        : "Inspección actualizada exitosamente"
    )
  },

  deleted: (inspectionNumber?: string) => {
    notifications.success(
      "Inspección eliminada",
      inspectionNumber
        ? `Inspección ${inspectionNumber} eliminada exitosamente`
        : "Inspección eliminada exitosamente"
    )
  },

  statusUpdated: (inspectionNumber: string, newStatus: string) => {
    notifications.info(
      "Estado actualizado",
      `Inspección ${inspectionNumber} cambió a: ${newStatus}`
    )
  },
}

export const reminderNotifications = {
  added: (reminderTitle?: string) => {
    notifications.success(
      "Recordatorio agregado",
      reminderTitle
        ? `"${reminderTitle}" agregado exitosamente`
        : "Nuevo recordatorio agregado exitosamente"
    )
  },

  updated: (reminderTitle?: string) => {
    notifications.success(
      "Recordatorio actualizado",
      reminderTitle
        ? `"${reminderTitle}" actualizado exitosamente`
        : "Recordatorio actualizado exitosamente"
    )
  },

  deleted: (reminderTitle?: string) => {
    notifications.success(
      "Recordatorio eliminado",
      reminderTitle
        ? `"${reminderTitle}" eliminado exitosamente`
        : "Recordatorio eliminado exitosamente"
    )
  },
}