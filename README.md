# ZwierzApp Mobile

## Application Description

**ZwierzApp** is a mobile application (React Native + Expo) for animal shelter employees and volunteers. After logging in, the user lands on a dashboard with the most important information about the shelter's operations: animals waiting for a walk, active walks, and food items with low stock. The app allows managing dog walks, browsing the list of animals, updating their photos, and dispensing or restocking food using a barcode scanner.

### System Requirements

- Node.js (LTS) + npm
- Expo SDK 54 / React Native 0.81
- Android Studio (emulator) or a physical device with the Expo Go app
- Access to the device camera (barcode scanning, animal photos)
- Internet connection (communication with the backend)

## Getting Started

```bash
npm install
npx expo start          # development mode
npm run android         # build and run on Android
```

The API address is configured via the `EXPO_PUBLIC_API_URL` variable in the `.env` file.

## Tests

```bash
npm test                # unit tests (Jest)
npm run test:watch      # watch mode
maestro test .maestro   # E2E tests (requires a running emulator and LOGIN_EMAIL / LOGIN_PASSWORD variables)
```

E2E tests (Maestro) cover the following scenarios: login, tab navigation, walk lifecycle, and logout.

**iOS:** After login, the system may show a **Save Password** sheet. The `login` flow dismisses it automatically. If tests still hang, disable **Settings → Apps → Passwords → Password Options → AutoFill Passwords** on the simulator, or adjust the tap coordinates in `.maestro/subflows/dismiss-ios-save-password.yaml` (use `maestro studio` on your device).

## Documentation

Code is documented with **JSDoc** comments and generated into HTML with **TypeDoc**.

```bash
npm run docs            # generates docs/api/ (open docs/api/index.html in a browser)
```

- **Architecture overview:** `docs/ARCHITECTURE.md`
- **API reference:** `docs/api/` (generated — not committed; run `npm run docs` before submission)

Documented modules: HTTP client, providers, API layers, React Query hooks, utils, and Zod schemas.
