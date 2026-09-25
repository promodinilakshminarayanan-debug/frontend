export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-edge bg-surface/50 p-10 text-center">
      <p className="font-display text-lg text-paper">No pairs tracked yet</p>
      <p className="mt-1 text-sm text-mist">
        Add a currency pair above to start watching its rate.
      </p>
    </div>
  );
}
