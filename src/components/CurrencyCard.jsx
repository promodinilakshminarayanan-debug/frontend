import { useEffect, useRef, useState } from "react";

export default function CurrencyCard({ pair, rate, status, onRemove }) {
  const { base, target } = pair;
  const previousRate = useRef(rate);
  const [flash, setFlash] = useState(null); // "gain" | "loss" | null

  useEffect(() => {
    if (rate == null || previousRate.current == null) {
      previousRate.current = rate;
      return;
    }
    if (rate > previousRate.current) setFlash("gain");
    else if (rate < previousRate.current) setFlash("loss");
    previousRate.current = rate;

    const t = setTimeout(() => setFlash(null), 900);
    return () => clearTimeout(t);
  }, [rate]);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-edge bg-surface p-5 animate-riseIn ${
        flash === "gain" ? "animate-flashGain" : flash === "loss" ? "animate-flashLoss" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onRemove(pair)}
        aria-label={`Remove ${base}/${target}`}
        className="absolute right-3 top-3 text-mist opacity-0 transition group-hover:opacity-100 hover:text-loss"
      >
        ✕
      </button>

      <p className="font-display text-sm tracking-wide text-mist">
        {base} <span className="text-edge">/</span> {target}
      </p>

      {status === "loading" && !rate && (
        <div className="mt-3 h-9 w-32 animate-pulse rounded bg-surfaceHigh" />
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-loss">Couldn't load this rate.</p>
      )}

      {rate != null && (
        <p className="mt-1 font-display text-3xl font-semibold text-paper">
          {rate.toFixed(4)}
          <span className="ml-2 text-sm font-normal text-mist">{target}</span>
        </p>
      )}

      <p className="mt-3 text-xs text-mist">1 {base} equals the rate shown</p>
    </div>
  );
}
