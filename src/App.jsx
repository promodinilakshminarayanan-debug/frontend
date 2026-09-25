import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import AddCurrencyForm from "./components/AddCurrencyForm";
import Dashboard from "./components/Dashboard";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { fetchRatesForPairs, checkHealth } from "./services/api";

const AUTO_REFRESH_MS = 5 * 60 * 1000; // 5 minutes — backend caches for 1hr anyway

export default function App() {
  const [pairs, setPairs] = useLocalStorage("currency-watcher:pairs", [
    { base: "USD", target: "EUR" },
    { base: "USD", target: "SGD" },
  ]);
  const [rates, setRates] = useState({});
  const [statusByPair, setStatusByPair] = useState({});
  const [isOnline, setIsOnline] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadRates = useCallback(async (pairsToLoad) => {
    if (pairsToLoad.length === 0) return;
    setIsRefreshing(true);
    setStatusByPair((prev) => {
      const next = { ...prev };
      pairsToLoad.forEach((p) => (next[`${p.base}_${p.target}`] = "loading"));
      return next;
    });

    try {
      const rateMap = await fetchRatesForPairs(pairsToLoad);
      setRates((prev) => ({ ...prev, ...rateMap }));
      setStatusByPair((prev) => {
        const next = { ...prev };
        pairsToLoad.forEach((p) => (next[`${p.base}_${p.target}`] = "ok"));
        return next;
      });
      setIsOnline(true);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      setIsOnline(false);
      setStatusByPair((prev) => {
        const next = { ...prev };
        pairsToLoad.forEach((p) => (next[`${p.base}_${p.target}`] = "error"));
        return next;
      });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial load + whenever the tracked pairs change
  useEffect(() => {
    loadRates(pairs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs]);

  // Background auto-refresh
  useEffect(() => {
    const id = setInterval(() => loadRates(pairs), AUTO_REFRESH_MS);
    return () => clearInterval(id);
  }, [pairs, loadRates]);

  // Backend health check on mount
  useEffect(() => {
    checkHealth()
      .then(setIsOnline)
      .catch(() => setIsOnline(false));
  }, []);

  function handleAdd(pair) {
    setPairs((prev) => [...prev, pair]);
  }

  function handleRemove(pair) {
    setPairs((prev) =>
      prev.filter((p) => !(p.base === pair.base && p.target === pair.target))
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10 sm:px-8">
      <Header
        isOnline={isOnline}
        lastUpdated={lastUpdated}
        onRefresh={() => loadRates(pairs)}
        isRefreshing={isRefreshing}
      />

      <AddCurrencyForm onAdd={handleAdd} existingPairs={pairs} />

      <Dashboard
        pairs={pairs}
        rates={rates}
        statusByPair={statusByPair}
        onRemove={handleRemove}
      />

      <footer className="mt-auto pt-6 text-center text-xs text-mist">
        Rates refresh automatically every 5 minutes, or tap Refresh anytime.
      </footer>
    </div>
  );
}
