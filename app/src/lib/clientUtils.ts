export const determineCurrentTab = (currentPath: string): string => {
  const tabMappings = [
    { path: "your-settings", tab: "dashboard" },
    { path: "team-settings", tab: "team" },
    { path: "create-team", tab: "team" },
    { path: "discussions", tab: "discussions" },
  ];

  for (const mapping of tabMappings) {
    if (currentPath.includes(mapping.path)) {
      return mapping.tab;
    }
  }

  return "dashboard";
};

export const handleNavClick = (store: any, tabName: string): void => {
  if (store?.ui?.updateCurrentTab) {
    store.ui.updateCurrentTab({ currentTab: tabName.toLowerCase() });
  }
};
