import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const TABS = [
  { to: '/', label: '홈', end: true },
  { to: '/explore', label: '알바 탐색' },
  { to: '/my', label: '내 조건' },
];

export function AppShell({ children, hideNav }: { children?: ReactNode; hideNav?: boolean }) {
  return (
    <div className="app-shell">
      {children ?? <Outlet />}
      {!hideNav && (
        <nav className="bottom-nav">
          {TABS.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={tab.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="dot" />
              {tab.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
