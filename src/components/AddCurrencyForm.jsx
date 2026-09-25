import { useState } from "react";
import { CURRENCIES } from "../constants";

export default function AddCurrencyForm({ onAdd, existingPairs }) {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (base === target) {
      setError("Base and target currencies must be different.");
      return;
    }
    const alreadyTracked = existingPairs.some(
      (p) => p.base === base && p.target === target
    );
    if (alreadyTracked) {
      setError(`${base}/${target} is already on your dashboard.`);
      return;
    }
    setError("");
    onAdd({ base, target });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-edge bg-surface p-4 sm:flex-row sm:items-end sm:gap-4"
    >
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-mist">
          From
        </label>
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="w-full rounded-lg border border-edge bg-surfaceHigh px-3 py-2 text-paper focus:border-gain"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-mist">
          To
        </label>
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full rounded-lg border border-edge bg-surfaceHigh px-3 py-2 text-paper focus:border-gain"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-gain px-5 py-2 font-display font-semibold text-ink transition hover:brightness-110 active:scale-[0.98]"
      >
        Add pair
      </button>

      {error && (
        <p className="text-sm text-loss sm:basis-full sm:pt-1" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
