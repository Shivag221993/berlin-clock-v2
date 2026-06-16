interface MinutesFiveRowProps {
  rowState: boolean[];
}

export function MinutesFiveRow({ rowState }: MinutesFiveRowProps) {
  return (
    <div className="berlin-clock-row" data-testid="clock-row-5m">
      {/* Stryker disable StringLiteral */}
      {rowState.map((isActive, i) => {
        const isRedIndicator = (i + 1) % 3 === 0;
        const targetColorClass = isRedIndicator ? 'lamp-red' : 'lamp-yellow';
        return (
          <div 
            key={`5m-${i}`} 
            className={`berlin-clock-lamp ${isActive ? targetColorClass : 'lamp-off'}`} 
          />
        );
      })}
      {/* Stryker restore StringLiteral */}
    </div>
  );
}