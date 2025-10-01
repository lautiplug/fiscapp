import type { FC, SVGProps } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Home from '../../../icons/svg/home.svg?react';
import Mail from '../../../icons/svg/mail.svg?react';
import Inspections from '../../../icons/svg/files.svg?react';
import Links from '../../../icons/svg/link.svg?react';
import Logout from '../../../icons/svg/logout.svg?react';
import TruckLogo from '../../../icons/truck.png';
import Table from '../../../icons/svg/table.svg?react';

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
  { title: 'Tablas', iconSVG: Table, path: '/tablas' },
];

const iconLogout: sidebar = { iconSVG: Logout }

export const SidebarView = () => {

  const LogoutIcon = iconLogout.iconSVG;

  return (
    <section className='h-full p-1 pt-2 pb-2 pl-2'>
      <div className='flex flex-col justify-between h-full bg-white rounded-xl p-4 shadow-sm border border-slate-200/50'>
        <div className='flex flex-col gap-2'>
          {/* Logo Section */}
          <div className='mb-4'>
            <div className='flex items-center gap-2.5 mb-2'>
              <div className='w-10 h-11 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20'>
                <img width={'30px'} src={TruckLogo} alt="camioneros logo" />
              </div>
              <h1 className='font-brand font-bold text-xl text-slate-800 tracking-tight'>FiscUp</h1>
            </div>
            <div className='w-12 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full'></div>
          </div>

          {/* Navigation */}
          {
            icons.map(({ title, iconSVG: Icon, path }) => (
              <NavLink
                key={title}
                to={path!}
                className="flex gap-3 items-center group rounded-lg transition-all duration-300 cursor-pointer
                 py-2 hover:bg-slate-50"
              >
                {({ isActive }) => (
                  <>
                    <div className={isActive
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-700 rounded-md p-2 shadow-md shadow-emerald-500/20 transition-all duration-300'
                      : 'bg-slate-50 rounded-md p-2 shadow-sm border border-slate-200/50 group-hover:shadow-md group-hover:bg-white transition-all duration-300'
                    }>
                      <Icon
                        width={"16px"}
                        height={"16px"}
                        className={isActive ? "sidebar-icon-active" : "sidebar-icon-inactive"}
                        style={{
                          stroke: isActive ? 'white' : 'rgb(71, 85, 105)',
                          strokeWidth: isActive ? 2 : 2,
                          color: isActive ? 'white' : 'rgb(71, 85, 105)'
                        }}
                      />
                    </div>
                    <span className={`${isActive
                      ? 'font-semibold text-slate-800 text-sm'
                      : 'font-medium text-slate-600 group-hover:text-slate-800 text-sm'
                    } transition-colors duration-300`}>{title}</span>
                  </>
                )}
              </NavLink>
            ))
          }
        </div>

        {/* Logout Section */}
        <Link to='/login?' className='flex items-center gap-3 w-full hover:bg-red-50/70 rounded-lg py-2 transition-all duration-300 cursor-pointer border-t border-slate-200/60 mt-4 pt-4 group'>
          <div className='bg-slate-50 shadow-sm rounded-md p-2 border border-slate-200/50 group-hover:bg-red-50/80 group-hover:border-red-200/50 transition-all duration-300'>
            <LogoutIcon width={'16px'} height={'16px'} className="stroke-red-500" />
          </div>
          <span className='font-medium text-slate-600 group-hover:text-red-500 transition-colors duration-300 text-sm'>Cerrar sesión</span>
        </Link>
      </div>
    </section>
  );
};
