// Premium Corporate Theme Colors
// Designed for enterprise-grade applications with sophisticated color palette

export const themeColors = {
  // Primary Brand Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main primary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },

  // Secondary Brand Colors (Slate-based for premium feel)
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Main secondary
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Accent Colors (Emerald for success, premium feel)
  accent: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Main accent
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },

  // Neutral Colors (Sophisticated grays)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373', // Main neutral
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Status Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Premium Gradients
  gradients: {
    primary: 'from-blue-600 to-blue-800',
    secondary: 'from-slate-600 to-slate-800',
    accent: 'from-emerald-500 to-emerald-700',
    premium: 'from-slate-700 via-slate-600 to-slate-800',
    corporate: 'from-blue-700 via-slate-700 to-slate-800',
    success: 'from-emerald-500 to-emerald-700',
    warning: 'from-amber-500 to-orange-600',
    error: 'from-red-500 to-red-700',
  },

  // Background Colors
  backgrounds: {
    light: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      accent: '#f0f9ff',
    },
    dark: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      accent: '#1e3a8a',
    },
  },

  // Text Colors
  text: {
    light: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      accent: '#0ea5e9',
    },
    dark: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      accent: '#38bdf8',
    },
  },

  // Border Colors
  borders: {
    light: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      accent: '#bae6fd',
    },
    dark: {
      primary: '#334155',
      secondary: '#475569',
      accent: '#1e40af',
    },
  },
} as const;

// Utility functions for theme colors
export const getThemeColor = (color: keyof typeof themeColors, shade: number = 500) => {
  return themeColors[color][shade as keyof typeof themeColors[typeof color]];
};

export const getGradient = (gradient: keyof typeof themeColors.gradients) => {
  return themeColors.gradients[gradient];
};

// CSS Custom Properties for dynamic theming
export const generateCSSVariables = (isDark: boolean = false) => {
  const prefix = isDark ? 'dark' : 'light';
  
  return {
    '--color-primary': themeColors.primary[500],
    '--color-secondary': themeColors.secondary[500],
    '--color-accent': themeColors.accent[500],
    '--color-success': themeColors.success[500],
    '--color-warning': themeColors.warning[500],
    '--color-error': themeColors.error[500],
    '--color-background': themeColors.backgrounds[prefix].primary,
    '--color-background-secondary': themeColors.backgrounds[prefix].secondary,
    '--color-background-tertiary': themeColors.backgrounds[prefix].tertiary,
    '--color-text-primary': themeColors.text[prefix].primary,
    '--color-text-secondary': themeColors.text[prefix].secondary,
    '--color-text-tertiary': themeColors.text[prefix].tertiary,
    '--color-border-primary': themeColors.borders[prefix].primary,
    '--color-border-secondary': themeColors.borders[prefix].secondary,
  };
};

