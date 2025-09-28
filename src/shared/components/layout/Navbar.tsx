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
    <nav className="flex justify-between items-center w-full px-1 bg-white mt-2 rounded-xl">
      <div className="flex flex-col gap-1 p-3 ">
        <h1 className="font-semibold text-xl text-slate-800 tracking-tight">{getGreeting(zonedDate)}, <span className="font-brand text-blue-600">Emir</span></h1>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span>Son las {formattedHour} del {formattedDay}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 mr-3">
        <button className="relative p-2 rounded-xl bg-white shadow-sm border border-slate-200/60 hover:shadow-md hover:bg-slate-50/50 transition-all duration-300 group">
          <IconNotif width={'25px'} height={'25px'} className="stroke-slate-600 group-hover:stroke-slate-700" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
        </button>
        <Link to="/perfil" className="relative p-2 rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all duration-300 group">
          <IconProfilePic width={'25px'} height={'25px'} className="stroke-white" />
        </Link>
      </div>
    </nav>
  )
}
