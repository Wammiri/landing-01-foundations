const TERMS = [
  "Cold storage",
  "Private keys",
  "Market cap",
  "Stablecoins",
  "Gas fees",
  "Custody",
  "Liquidity",
  "Self custody",
  "Volatility",
  "Position sizing",
  "DYOR",
  "Risk budget",
];

/**
 * The signature element: a market tape carrying curriculum vocabulary rather
 * than prices, which keeps it honest (no invented price data).
 *
 * Two identical rows sit inside an overflow hidden track. Translating the
 * track by -50% lands the second row exactly where the first started, so the
 * loop is seamless. Animation, hover pause, and the reduced motion opt out
 * all live in globals.css, so this stays a server component.
 */
export default function Ticker() {
  const row = (
    <ul aria-hidden className="flex shrink-0 items-center">
      {TERMS.map((term) => (
        <li key={term} className="mono-label flex items-center whitespace-nowrap text-[0.72rem] text-amber">
          {term}
          <span className="px-4 text-amber/40">&middot;</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      data-testid="ticker-band"
      className="ticker-band overflow-hidden border-y border-line bg-panel py-3.5"
    >
      {/* The terms are decorative repetition visually, so the readable copy is
          exposed once to assistive technology instead of twice. */}
      <h2 className="sr-only">Course vocabulary</h2>
      <p className="sr-only">{TERMS.join(", ")}.</p>

      <div data-testid="ticker-track" className="ticker-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
