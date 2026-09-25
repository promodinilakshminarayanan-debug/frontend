import CurrencyCard from "./CurrencyCard";
import EmptyState from "./EmptyState";

export default function Dashboard({ pairs, rates, statusByPair, onRemove }) {
  if (pairs.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pairs.map((pair) => {
        const key = `${pair.base}_${pair.target}`;
        return (
          <CurrencyCard
            key={key}
            pair={pair}
            rate={rates[key]}
            status={statusByPair[key] || "idle"}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}
