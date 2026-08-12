export function FitPercentBar({ score }: { score: number }) {
  return (
    <div className="fitbar">
      <div className="fitbar-track compact">
        <div className="fitbar-fill" style={{ width: `${score}%` }} />
      </div>
      <span className="fitbar-label">{score}%</span>
    </div>
  );
}
