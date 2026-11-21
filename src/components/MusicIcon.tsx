import type { Platform } from "@/data/songs";

export function MusicIcon({ platform }: { platform: Platform }) {
  const common = { viewBox: "0 0 64 64", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true as const };
  switch (platform) {
    case "yandexMusic":
      return <svg {...common}><g fill="currentColor"><path d="M32 2 36 26 52 10 42 29 64 32 42 36 54 54 36 42 32 64 28 41 10 54 22 37 1 32 23 28 12 10 28 23Z"/><circle cx="32" cy="32" r="7" /></g></svg>;
    case "appleMusic":
      return <svg {...common}><path fill="currentColor" d="M25 12 51 6v35.5a10 10 0 1 1-5-8.7V18L30 22v25.5a10 10 0 1 1-5-8.7V12Z" /></svg>;
    case "spotify":
      return <svg {...common} stroke="currentColor" strokeLinecap="round" fill="none"><path strokeWidth="7" d="M10 23c15-6 31-3 46 3"/><path strokeWidth="6" d="M13 34c14-5 28-2 39 3"/><path strokeWidth="5" d="M16 44c12-3 24-1 32 5"/></svg>;
    case "vkMusic":
      return <svg {...common} fill="currentColor"><rect x="5" y="28" width="7" height="13" rx="3"/><rect x="16" y="23" width="7" height="23" rx="3"/><rect x="27" y="15" width="7" height="39" rx="3"/><rect x="38" y="24" width="7" height="21" rx="3"/><rect x="49" y="18" width="7" height="33" rx="3"/></svg>;
    case "itunes":
      return <svg {...common} fill="currentColor"><path d="M43 17c-5 0-7 3-11 3s-7-3-12-2C7 20 6 41 14 50c5 6 10 6 16 2 5-3 7-2 12 0 8 4 15-9 16-17-7-1-11-13-15-18ZM35 14c1-9 8-13 15-13-1 9-7 13-15 13Z" /></svg>;
    case "youtube":
      return <svg {...common} fill="currentColor"><path d="m23 13 29 19-29 19V13Z" /></svg>;
  }
}
