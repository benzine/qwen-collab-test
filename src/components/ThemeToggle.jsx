import { useState, useEffect } from 'react';

/**
 * ThemeToggle
 * -----------
 * Lightweight React widget that drives the AutoParts Pro Light/Dark engine.
 * - On mount: restores the persisted preference from localStorage, or
 *   falls back to the OS `prefers-color-scheme` if none is stored.
 * - Toggling flips the `dark-mode` class on document.body (the CSS custom
 *   properties in src/styles/_variables.scss handle the actual palette swap).
 * - Persists the choice to localStorage so the preference survives reloads.
 */
const STORAGE_KEY = 'autoparts-pro-theme';

// Inline SVGs keep the bundle dependency-free.
const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="5.59" y2="5.59" />
    <line x1="18.41" y1="18.41" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.59" y2="18.41" />
    <line x1="18.41" y1="5.59" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const dark = stored ? stored === 'dark' : systemPrefersDark;
    setIsDark(dark);
    document.body.classList.toggle('dark-mode', dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.body.classList.toggle('dark-mode', next);
    window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: `2px solid ${isDark ? '#DC2626' : '#6B7280'}`,
        background: isDark ? 'rgba(220, 38, 38, 0.12)' : 'transparent',
        color: isDark ? '#DC2626' : '#6B7280',
        cursor: 'pointer',
        transition: 'background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease, transform 0.2s ease',
      }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
