export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          textFieldColor: '#829baf',
          courseSelectionPanelColor: 'rgba(216,216,216)',
        }
      : {
          // palette values for dark mode
          textFieldColor: '#fff',
          courseSelectionPanelColor: '#000',
        }),
  },
});
