import type { ReactNode } from 'react';

export function BottomSheet({
  onClose,
  title,
  lead,
  children,
}: {
  onClose: () => void;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="grabber" />
        <h2>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
