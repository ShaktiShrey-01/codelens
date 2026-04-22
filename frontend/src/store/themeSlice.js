// Redux theme slice controlling appearance tokens used across the app UI.
import { createSlice } from '@reduxjs/toolkit'

export const THEMES = {
  cyberpunk: {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Default neon palette with violet accents and dark glass surfaces.',
    accent: '#7b39fc',
    accentStrong: '#8f52ff',
    accentSoft: 'rgba(123, 57, 252, 0.18)',
    border: 'rgba(123, 57, 252, 0.32)',
    borderStrong: 'rgba(123, 57, 252, 0.55)',
    text: '#f4f7ff',
    textMuted: 'rgba(197, 209, 236, 0.74)',
    surface: 'rgba(5, 10, 24, 0.72)',
    surfaceAlt: 'rgba(7, 14, 31, 0.76)',
    panel: 'rgba(11, 16, 30, 0.72)',
    background: '#020309',
    backgroundAlt: '#04060b',
    cursor: '#000000',
    link: '#8ebdff',
  },
  greeny: {
    id: 'greeny',
    label: 'Greeny',
    description: 'Dark green focus with softer borders and a more natural editing feel.',
    accent: '#14532d',
    accentStrong: '#1f7a3f',
    accentSoft: 'rgba(20, 83, 45, 0.18)',
    border: 'rgba(20, 83, 45, 0.32)',
    borderStrong: 'rgba(20, 83, 45, 0.55)',
    text: '#e8f7ec',
    textMuted: 'rgba(196, 228, 200, 0.8)',
    surface: 'rgba(7, 26, 15, 0.76)',
    surfaceAlt: 'rgba(8, 31, 18, 0.82)',
    panel: 'rgba(10, 38, 22, 0.86)',
    background: '#03150c',
    backgroundAlt: '#071c12',
    cursor: '#0a2315',
    link: '#9ae6b4',
  },
  aurora: {
    id: 'aurora',
    label: 'Aurora',
    description: 'Bright cyan and blue highlights with a crisp product-UI feel.',
    accent: '#0891b2',
    accentStrong: '#0ea5e9',
    accentSoft: 'rgba(8, 145, 178, 0.18)',
    border: 'rgba(8, 145, 178, 0.32)',
    borderStrong: 'rgba(14, 165, 233, 0.55)',
    text: '#effdff',
    textMuted: 'rgba(202, 238, 244, 0.76)',
    surface: 'rgba(5, 18, 28, 0.76)',
    surfaceAlt: 'rgba(6, 24, 38, 0.82)',
    panel: 'rgba(7, 28, 44, 0.9)',
    background: '#020814',
    backgroundAlt: '#06121d',
    cursor: '#04131f',
    link: '#7dd3fc',
  },
  ember: {
    id: 'ember',
    label: 'Ember',
    description: 'Warm orange and coral contrast for a bold, editorial look.',
    accent: '#c2410c',
    accentStrong: '#ea580c',
    accentSoft: 'rgba(194, 65, 12, 0.18)',
    border: 'rgba(194, 65, 12, 0.32)',
    borderStrong: 'rgba(234, 88, 12, 0.55)',
    text: '#fff6ef',
    textMuted: 'rgba(242, 219, 205, 0.78)',
    surface: 'rgba(34, 13, 8, 0.8)',
    surfaceAlt: 'rgba(44, 18, 11, 0.86)',
    panel: 'rgba(53, 24, 15, 0.92)',
    background: '#0c0504',
    backgroundAlt: '#140907',
    cursor: '#20110c',
    link: '#fdba74',
  },
  graphite: {
    id: 'graphite',
    label: 'Graphite',
    description: 'Neutral grayscale with quieter borders and a minimal product shell.',
    accent: '#475569',
    accentStrong: '#64748b',
    accentSoft: 'rgba(71, 85, 105, 0.18)',
    border: 'rgba(100, 116, 139, 0.32)',
    borderStrong: 'rgba(100, 116, 139, 0.55)',
    text: '#f6f8fb',
    textMuted: 'rgba(203, 213, 225, 0.74)',
    surface: 'rgba(17, 24, 39, 0.78)',
    surfaceAlt: 'rgba(24, 31, 45, 0.86)',
    panel: 'rgba(29, 37, 54, 0.92)',
    background: '#02040a',
    backgroundAlt: '#070b14',
    cursor: '#0f172a',
    link: '#cbd5e1',
  },
}

const initialState = {
  themeId: 'cyberpunk',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      if (THEMES[action.payload]) {
        state.themeId = action.payload
      }
    },
  },
})

export const { setTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer

export const THEME_OPTIONS = Object.values(THEMES)

export const selectThemeId = (state) => state.theme.themeId
export const selectTheme = (state) => THEMES[state.theme.themeId] ?? THEMES.cyberpunk
