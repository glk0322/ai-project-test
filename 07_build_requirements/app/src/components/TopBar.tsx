import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export function TopBar({
  title,
  onBack,
  showBack = true,
  right,
}: {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  right?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      {showBack && (
        <button className="back" onClick={() => (onBack ? onBack() : navigate(-1))} aria-label="뒤로가기">
          ‹
        </button>
      )}
      <h1 key={title} className="topbar-title" style={{ flex: 1 }}>
        {title}
      </h1>
      {right}
    </div>
  );
}
