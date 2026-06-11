# ZwierzApp Mobile

## Application Description

**ZwierzApp** is a mobile application (React Native + Expo) for animal shelter employees and volunteers. After logging in, the user lands on a dashboard with the most important information about the shelter's operations: animals waiting for a walk, active walks, and food items with low stock. The app allows managing dog walks, browsing the list of animals, updating their photos, and dispensing or restocking food using a barcode scanner. Data is fetched from a REST API (`https://api.zwierz-app.pl/api/v1`) with JWT authentication.

## Requirements

### System Requirements

- Node.js (LTS) + npm
- Expo SDK 54 / React Native 0.81
- Android Studio (emulator) or a physical device with the Expo Go app
- Access to the device camera (barcode scanning, animal photos)
- Internet connection (communication with the backend)

### Functional Requirements

1. The user can log in with an e-mail address and password.
2. The user session is restored after restarting the app (tokens stored in secure storage).
3. The user can log out, which invalidates the refresh token and clears the session.
4. The dashboard presents statistics: the number of animals waiting for a walk, the number of animals in the shelter, and walks completed today by the user.
5. The user can start a walk with a selected dog and end an ongoing walk.
6. The app presents walk lists: waiting, mine, and all.
7. The user can browse the list of animals in the shelter (name, species, breed, sex, status).
8. The user can update an animal's main photo by taking it with the camera.
9. The user can dispense food from the inventory by scanning a barcode (or entering it manually) and providing the amount.
10. The user can receive a food delivery (restock) by scanning a barcode and providing the number of packages.
11. The app presents the food inventory state with statuses: available, low stock, out of stock, discontinued.
12. The user profile displays the user's data: full name, role, e-mail, and shelter identifier.

### Non-functional Requirements

- Access tokens stored securely (`expo-secure-store`); automatic token refresh on expiry (401 handling).
- Validation of form data and API responses (Zod + React Hook Form).
- Data caching and refreshing (TanStack React Query, pull-to-refresh).
- Polish-language interface, navigation based on a bottom tab bar.

## Feature List

### Authentication

- E-mail + password login with form validation
- Automatic session restore on app start
- Logout with token cleanup
- Role support: system admin, shelter admin, employee, volunteer, vet

### Dashboard

- Greeting with the user's name and role
- Stat cards: waiting walks, number of animals, today's walks
- Active walk banner with the option to end the walk
- Preview of animals waiting for a walk (prioritized by time since last walk)
- Preview of food items with low stock

### Walks

- Three views: Waiting / Mine / All
- Starting a walk with a selected dog ("Add walk" modal)
- Ending an ongoing walk
- Walk cards with the animal's photo, walker, and start/end times

### Animals

- List of all animals in the shelter
- Updating an animal's main photo (camera + S3 upload via presigned URL)

### Inventory

- Food list with stock state (weight, number and size of packages)
- Dispensing food with barcode scanning (EAN-13, EAN-8, Code 128, Code 39, QR)
- Receiving food deliveries (restock)

### Profile

- User data: avatar (initials), full name, role, e-mail, shelter
- Logout

## Technologies

| Area                 | Technology                             |
| -------------------- | -------------------------------------- |
| Framework            | React Native 0.81 + Expo SDK 54        |
| Navigation           | Expo Router (bottom tabs)              |
| Styling              | NativeWind (Tailwind CSS)              |
| State / data         | TanStack React Query, Axios            |
| Forms and validation | React Hook Form + Zod                  |
| Security             | expo-secure-store (JWT access/refresh) |
| Camera               | expo-camera (barcode scanner, photos)  |
| Unit tests           | Jest (jest-expo)                       |
| E2E tests            | Maestro                                |

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

## Documentation

Code is documented with **JSDoc** comments and generated into HTML with **TypeDoc**.

```bash
npm run docs            # generates docs/api/ (open docs/api/index.html in a browser)
```

- **Architecture overview:** `docs/ARCHITECTURE.md`
- **API reference:** `docs/api/` (generated — not committed; run `npm run docs` before submission)

Documented modules: HTTP client, providers, API layers, React Query hooks, utils, and Zod schemas.
