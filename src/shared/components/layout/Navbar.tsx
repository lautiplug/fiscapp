import type { FC, SVGProps } from "react";
import { Link } from "react-router-dom";
import Notifications from '../../../icons/svg/notifications.svg?react';
import ProfilePic from '../../../icons/svg/profile.svg?react';
import { useState, useEffect } from "react";
import { toZonedTime, format } from "date-fns-tz";

type icons = {
  iconSVG: FC<SVGProps<SVGSVGElement>>;
}
const iconNotification: icons = { iconSVG: Notifications }
const iconProfilePic: icons = { iconSVG: ProfilePic }

export const Navbar = () => {
  const IconNotif = iconNotification.iconSVG
  const IconProfilePic = iconProfilePic.iconSVG

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const timeZone = "America/Argentina/Buenos_Aires";
  const zonedDate = toZonedTime(currentTime, timeZone);
  const formattedDay = format(zonedDate, "dd/MM/yyyy");
  const formattedHour = format(zonedDate, 'HH:mm');

  const getGreeting = (zonedDate: Date) => {
    const hour = zonedDate.getHours();
    if (hour >= 6 && hour < 12) {
      return "Buenos días";
    } else if (hour >= 12 && hour < 19) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  };

  return (
    <nav className="flex justify-between pt-5 pb-5 items-center w-full">
      <div>
        <h1 className="font-bold text-2xl text-green-800">{getGreeting(zonedDate)}, Emir. </h1>
        <p>Son las {formattedHour} del {formattedDay}</p>
      </div>
      <div className="flex items-center justify-end w-2/5 gap-2">
        <div className="p-1.5 rounded-xl shadow-sm  border bg-white transition-colors">
          <IconNotif width={'35px'} height={'35px'} />
        </div>
        <Link to="/perfil" className="hover:opacity-80 transition-opacity">
          <IconProfilePic width={'55px'} height={'55px'} />
        </Link>
      </div>
    </nav>
  )
}
