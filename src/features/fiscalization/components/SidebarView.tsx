import type { FC, SVGProps } from 'react';
import { NavLink } from 'react-router-dom';
import Home from '../../../icons/svg/home.svg?react';
import Mail from '../../../icons/svg/mail.svg?react';
import Inspections from '../../../icons/svg/files.svg?react';
import Links from '../../../icons/svg/link.svg?react';
import Logout from '../../../icons/svg/logout.svg?react';

type sidebar = {
  title?: string;
  iconSVG: FC<SVGProps<SVGSVGElement>>;
  path?: string;
}

const icons: sidebar[] = [
  { title: 'Inicio', iconSVG: Home, path: '/inicio' },
  { title: 'Email', iconSVG: Mail, path: '/email' },
  { title: 'Inspecciones', iconSVG: Inspections, path: '/inspecciones' },
  { title: 'Links', iconSVG: Links, path: '/links' },
];

const iconLogout: sidebar = { iconSVG: Logout }

export const SidebarView = () => {

  const LogoutIcon = iconLogout.iconSVG;

  return (
    <section className='flex flex-col justify-between h-full p-5'>
      <div className='flex flex-col gap-3 justify-center self-center w-50'>
        <h1 className='font-bold text-2xl'>fscam</h1>
        {
          icons.map(({ title, iconSVG: Icon, path }) => (
            <NavLink 
              key={title} 
              to={path!}
              className={({ isActive }) => 
                `flex gap-4 max-w-md self-start items-center w-full hover:bg-green-100 group rounded-xl p-1 transition-all duration-300 cursor-pointer ${
                  isActive ? 'bg-green-50' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={isActive ? `shadow-sm rounded-md p-2 bg-green-300` : `shadow-sm rounded-md p-2`}>
                    <Icon width={"24px"} height={"24px"} />
                  </div>
                  <h1 className={`font-medium ${isActive ? 'text-green-800' : ''}`}>{title}</h1>
                </>
              )}
            </NavLink>
          ))
        }
      </div>
      <div className='flex items-center gap-5 justify-center self-center w-50'>
        <div className='shadow-sm rounded-md pl-2 p-3'>
          <LogoutIcon width={'24px'} height={'24px'} />
        </div>
        <p className='font-bold text-md'>Cerrar sesión</p>
      </div>
    </section>
  );
};
