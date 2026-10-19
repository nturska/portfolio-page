export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_TRANSITION_CLASS = "theme-transition";
export const THEME_TRANSITION_MS = 500;

export const isTheme = (value: string | null | undefined): value is Theme =>
  value === "light" || value === "dark";

// Runs before hydration to avoid a flash of the wrong theme.
export const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`;
