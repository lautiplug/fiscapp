import type { FC, SVGProps } from "react";
import { Input } from "../../../components/ui/input";
import Search from '../../../icons/svg/search.svg?react';
import Notifications from '../../../icons/svg/notifications.svg?react';
import ProfilePic from '../../../icons/svg/profile.svg?react';

type icons = {
  iconSVG: FC<SVGProps<SVGSVGElement>>;
}

const iconSearch: icons = { iconSVG: Search }
const iconNotification: icons = { iconSVG: Notifications }
const iconProfilePic: icons = { iconSVG: ProfilePic }

export const Navbar = () => {

  const IconSearch = iconSearch.iconSVG
  const IconNotif = iconNotification.iconSVG
  const IconProfilePic = iconProfilePic.iconSVG

  return (
    <nav className="flex justify-between pt-5 pb-5 items-center w-full">
      <div>
        <h1 className="font-bold text-2xl">Buenos días, Emir.</h1>
      </div>
      <div className="flex items-center justify-end w-2/5 gap-2">
        <div className="bg-white flex items-center gap-2 shadow-sm pr-5 rounded-xl p-1">
          <Input className="p-5 rounded-xl border-none outline-0 shadow-none" type="search" placeholder="Buscar" />
          <IconSearch width={'30px'} height={'30px'} />
        </div>
        <div className="p-1.5 rounded-xl shadow-sm bg-white">
          <IconNotif width={'35px'} height={'35px'} />
        </div>
        <IconProfilePic width={'55px'} height={'55px'} />
      </div>
    </nav>
  )
}
