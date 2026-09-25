export default function Header({ isOnline, lastUpdated, onRefresh, isRefreshing }) {
  return (
    <header className="flex flex-col gap-4 border-b border-edge pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-display text-sm uppercase tracking-wide text-gain">
          Live rates
        </p>
        <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
          Currency Watcher
        </h1>
        <p className="mt-1 text-sm text-mist">
          Track the pairs that matter to you, updated on your schedule.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-mist">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isOnline ? "bg-gain" : "bg-loss"
            }`}
            aria-hidden="true"
          />
          {isOnline ? "Backend connected" : "Backend unreachable"}
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-medium text-paper transition hover:border-gain hover:text-gain disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRefreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {lastUpdated && (
        <p className="hidden text-xs text-mist sm:block">
          Updated {lastUpdated}
        </p>
      )}
    </header>
  );
}
