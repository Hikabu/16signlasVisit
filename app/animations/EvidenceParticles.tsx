import { useId } from "react";

// A machined bezel: concentric surfaces, engraved divisions, and reflected light.
// SVG keeps the fine marks crisp without a continuously repainting canvas.
export function EvidenceParticles() {
  const id = useId();
  const paint = (name: string) => `url(#${id}-${name})`;

  return (
    <svg viewBox="0 0 720 470" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-body`} x1="180" y1="60" x2="515" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#333d3d" />
          <stop offset="0.36" stopColor="#171c1d" />
          <stop offset="0.68" stopColor="#252728" />
          <stop offset="1" stopColor="#39302c" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="150" y1="95" x2="490" y2="390" gradientUnits="userSpaceOnUse">
          <stop stopColor="#627375" stopOpacity="0.38" />
          <stop offset="0.45" stopColor="#929b9c" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ac9a8d" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${id}-silver`} x1="430" y1="389" x2="652" y2="239" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bec6c4" stopOpacity="0" />
          <stop offset="0.23" stopColor="#c9cecc" stopOpacity="0.45" />
          <stop offset="0.62" stopColor="#e7e9e3" stopOpacity="0.86" />
          <stop offset="0.88" stopColor="#b4bfbd" stopOpacity="0.5" />
          <stop offset="1" stopColor="#b4bfbd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cool`} x1="74" y1="201" x2="236" y2="103" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7194a9" stopOpacity="0" />
          <stop offset="0.42" stopColor="#7194a9" stopOpacity="0.32" />
          <stop offset="1" stopColor="#7194a9" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={`${id}-ambient`} x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <ellipse cx="355" cy="249" rx="298" ry="164" stroke="#020505" strokeOpacity="0.5" strokeWidth="25" filter={paint("ambient")} />
      <ellipse cx="350" cy="212" rx="269" ry="157" stroke="#64848e" strokeOpacity="0.07" strokeWidth="7" filter={paint("soft")} />

      <ellipse cx="360" cy="244" rx="305" ry="174" stroke={paint("body")} strokeWidth="25" />
      <ellipse cx="360" cy="235" rx="294" ry="163" stroke={paint("body")} strokeWidth="27" />
      <ellipse cx="360" cy="235" rx="309" ry="179" stroke={paint("edge")} />
      <ellipse cx="360" cy="235" rx="294" ry="163" stroke="#84918e" strokeOpacity="0.2" />
      <ellipse cx="360" cy="235" rx="274" ry="144" stroke="#8e9996" strokeOpacity="0.13" />
      <ellipse cx="360" cy="242" rx="268" ry="142" stroke="#060b0b" strokeOpacity="0.8" strokeWidth="7" />
      <ellipse cx="360" cy="246" rx="267" ry="140" stroke="#81918d" strokeOpacity="0.1" />

      {Array.from({ length: 80 }, (_, index) => {
        const angle = (index / 80) * Math.PI * 2;
        const major = index % 10 === 0;
        const middle = index % 5 === 0;
        const depth = major ? 18 : middle ? 13 : 8;
        const point = (radius: number, center: number, trig: number) =>
          Number((center + radius * trig).toFixed(3));
        return (
          <line
            key={index}
            x1={point(294, 360, Math.cos(angle))}
            y1={point(163, 235, Math.sin(angle))}
            x2={point(294 - depth, 360, Math.cos(angle))}
            y2={point(163 - depth, 235, Math.sin(angle))}
            stroke={major ? "#a9b7b3" : "#899590"}
            strokeOpacity={major ? 0.47 : middle ? 0.27 : 0.17}
            strokeWidth={major ? 1.4 : 0.8}
          />
        );
      })}

      <path d="M 647 236 A 287 157 0 0 1 436 386" stroke={paint("silver")} strokeWidth="23" filter={paint("soft")} />
      <path d="M 647 236 A 287 157 0 0 1 436 386" stroke={paint("silver")} strokeOpacity="0.7" strokeWidth="10" />
      <path d="M 641 250 A 294 163 0 0 1 452 390" stroke={paint("silver")} strokeOpacity="0.5" strokeWidth="1.2" />
      <path d="M 78 207 A 287 157 0 0 1 241 92" stroke={paint("cool")} strokeWidth="22" filter={paint("soft")} />
    </svg>
  );
}
