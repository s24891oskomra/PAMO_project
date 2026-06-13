/** Stable selectors for Maestro E2E tests — avoid text/regex matching in flows. */
export const TestIds = {
  screens: {
    login: "screen-login",
    home: "screen-home",
    walks: "screen-walks",
    createWalk: "screen-create-walk",
    animals: "screen-animals",
    magazyn: "screen-magazyn",
    profile: "screen-profile",
  },
  login: {
    email: "login-email",
    password: "login-password",
    submit: "login-submit",
  },
  tabs: {
    home: "tab-home",
    walks: "tab-walks",
    animals: "tab-animals",
    magazyn: "tab-magazyn",
    profile: "tab-profile",
  },
  dashboard: {
    statWaiting: "dashboard-stat-waiting",
    statAnimals: "dashboard-stat-animals",
    statToday: "dashboard-stat-today",
  },
  walks: {
    tab: (key: "waiting" | "mine" | "all") => `walks-tab-${key}`,
    addWalk: "add-walk-button",
    createWalkStart: "create-walk-start",
    dog: (name: string) =>
      `walk-dog-${name.trim().toLowerCase().replace(/\s+/g, "-")}`,
    ongoingBadge: "walk-ongoing-badge",
    endButton: "walk-end-button",
    waitingList: "walks-waiting-list",
    mineList: "walks-mine-list",
  },
  animals: {
    title: "animals-title",
    list: "animals-list",
  },
  magazyn: {
    title: "magazyn-title",
    dispense: "magazyn-dispense",
    restock: "magazyn-restock",
    list: "magazyn-list",
  },
  profile: {
    email: "profile-email",
    logout: "logout-button",
  },
} as const;
