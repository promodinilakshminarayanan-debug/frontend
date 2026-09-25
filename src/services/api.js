const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * Fetches exchange rates for one base currency against a list of targets.
 * Matches the backend contract: GET /api/rates?base=USD&targets=EUR,SGD
 */
export async function fetchRates(base, targets) {
  const url = `${API_BASE_URL}/api/rates?base=${encodeURIComponent(
    base
  )}&targets=${encodeURIComponent(targets.join(","))}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Rate request failed (${response.status})`);
  }
  return response.json();
}

/**
 * Given a flat list of { base, target } pairs, groups them by base
 * currency so we make one request per base instead of one per pair.
 */
export async function fetchRatesForPairs(pairs) {
  const targetsByBase = pairs.reduce((acc, { base, target }) => {
    acc[base] = acc[base] || new Set();
    acc[base].add(target);
    return acc;
  }, {});

  const entries = Object.entries(targetsByBase);
  const results = await Promise.all(
    entries.map(([base, targetSet]) => fetchRates(base, [...targetSet]))
  );

  // Merge into a lookup keyed as "BASE_TARGET" -> rate
  const rateMap = {};
  entries.forEach(([base], i) => {
    const payload = results[i];
    const rates = payload.rates || payload; // tolerate either shape
    Object.entries(rates).forEach(([target, rate]) => {
      rateMap[`${base}_${target}`] = rate;
    });
  });
  return rateMap;
}

export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  return response.ok;
}
