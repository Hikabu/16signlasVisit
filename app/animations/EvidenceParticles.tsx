"use client";

import { useId } from "react";
import styles from "./EvidenceParticles.module.css";

// A machined bezel: concentric surfaces and engraved divisions.
export function EvidenceParticles() {
  const id = useId();
  const paint = (name: string) => `url(#${id}-${name})`;

  return (
    <svg className={styles.rings} viewBox="0 0 720 470" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${id}-haloBlur`} x="-150%" y="-400%" width="400%" height="900%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id={`${id}-coreBlur`} x="-150%" y="-400%" width="400%" height="900%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id={`${id}-shadowBlur`} x="-150%" y="-400%" width="400%" height="900%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <linearGradient id={`${id}-body`} x1="180" y1="60" x2="515" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#333d3d" />
          <stop offset="0.36" stopColor="#171c1d" />
          <stop offset="0.68" stopColor="#252728" />
          <stop offset="1" stopColor="#39302c" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="150" y1="95" x2="490" y2="390" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5f6866" stopOpacity="0.38" />
          <stop offset="0.45" stopColor="#929b9c" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ac9a8d" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${id}-silver`} x1="430" y1="389" x2="652" y2="239" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bec6c4" stopOpacity="0" />
          <stop offset="0.26" stopColor="#c9cecc" stopOpacity="0.55" />
          <stop offset="0.62" stopColor="#f0f3ed" stopOpacity="0.92" />
          <stop offset="0.9" stopColor="#b4bfbd" stopOpacity="0.42" />
          <stop offset="1" stopColor="#b4bfbd" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id={`${id}-ambient`} x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={`${id}-light`} x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id={`${id}-channel`} clipPathUnits="userSpaceOnUse">
          <path
            fillRule="evenodd"
            d="M 662 235 a 302 171 0 1 1 -604 0 a 302 171 0 1 1 604 0 Z M 627 235 a 267 140 0 1 0 -534 0 a 267 140 0 1 0 534 0 Z"
          />
        </clipPath>
        <g id={`${id}-bezel`}>
          <ellipse cx="355" cy="249" rx="298" ry="164" stroke="#020505" strokeOpacity="0.5" strokeWidth="25" filter={paint("ambient")} />
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

        </g>
      </defs>

      <g data-ring="main">
        <use href={`#${id}-bezel`} />
        <g className={styles.channelLights} clipPath={`url(#${id}-channel)`}>
          <ellipse className={styles.brightSegment} cx="360" cy="235" rx="281" ry="151" pathLength="100" stroke="#f4faf7" strokeOpacity="0.88" strokeWidth="12" strokeDasharray="21 79" filter={paint("light") } />
          <ellipse className={styles.shadowSegment}  cx="360" cy="235" rx="281" ry="151" pathLength="100" stroke="#4f98bd" strokeOpacity="0.84" strokeWidth="10" strokeDasharray="7 93" transform="rotate(180 360 235)" filter={paint("shadowBlur")} />
        </g>
        <g className={styles.channelEdge} aria-hidden="true">
          <ellipse cx="360" cy="235" rx="294" ry="163" stroke={paint("edge")} strokeOpacity="0.42" strokeWidth="1.5" />
          <ellipse cx="360" cy="235" rx="267" ry="140" stroke="#060b0b" strokeOpacity="0.8" strokeWidth="7" />
          <ellipse cx="360" cy="235" rx="274" ry="144" stroke="#8e9996" strokeOpacity="0.13" />
        </g>
      </g>
    </svg>
  );
}
