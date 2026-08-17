export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="screen">
      <div style={{ padding: '4px 0 12px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>{title}</h1>
      </div>
      <div className="empty-state">
        <p className="t">곧 만나요</p>
        <p className="d">{title} 기능은 다음 업데이트에서 준비 중이에요.</p>
      </div>
    </div>
  );
}
