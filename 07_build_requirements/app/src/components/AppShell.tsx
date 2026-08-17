import type { ComponentType, ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ChatIcon, HomeIcon, MapPinIcon, UserIcon, UsersIcon } from './NavIcons';

const TABS: { to: string; label: string; end?: boolean; Icon: ComponentType }[] = [
  { to: '/', label: '홈', end: true, Icon: HomeIcon },
  { to: '/community', label: '커뮤니티', Icon: UsersIcon },
  { to: '/map', label: '지도', Icon: MapPinIcon },
  { to: '/chat', label: '채팅', Icon: ChatIcon },
  { to: '/my', label: 'MY', Icon: UserIcon },
];

export function AppShell({ children, hideNav }: { children?: ReactNode; hideNav?: boolean }) {
  return (
    <div className="app-shell">
      <div className="app-content">{children ?? <Outlet />}</div>
      {!hideNav && (
        <nav className="bottom-nav">
          {TABS.map(({ to, label, end, Icon }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
