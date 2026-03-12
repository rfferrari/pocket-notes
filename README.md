# Pocket Notes

Pocket Notes is a simple note-taking mobile-first application built with Ionic, Angular, and Capacitor.
It allows users to create, edit, favorite, search, and delete notes with local persistence on the device.

## Features

- Create new notes
- Edit existing notes
- Delete notes with confirmation
- Mark notes as favorite
- Search notes by title
- Sort notes by favorite status and last update date
- Persist data locally using Capacitor Preferences
- Android platform support through Capacitor

## Tech Stack

- Angular 20
- Ionic 8
- Capacitor 8
- TypeScript
- SCSS
- Ionicons

## Project Structure

```text
src/
  app/
    core/
    features/
      note/
        models/
        pages/
        services/
    shared/
  assets/
  environments/
```

## Routing

The application currently exposes these main routes:

- `/notes` - notes list
- `/notes/create` - create a new note
- `/notes/edit/:id` - edit an existing note

## Data Persistence

Notes are stored locally using `@capacitor/preferences`.
There is no backend API required for the current implementation.

## Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI
- Ionic CLI (optional but useful)
- Android Studio for Android builds

### Install dependencies

```bash
npm install
```

### Run in the browser

```bash
npm start
```

This starts the Angular development server, usually on `http://localhost:4200`.

### Build the project

```bash
npm run build
```

### Run tests

```bash
npm test
```

## Android

To sync web assets with the Android project:

```bash
npx cap sync android
```

To open the Android project in Android Studio:

```bash
npx cap open android
```

## Scripts

- `npm start` - run the Angular dev server
- `npm run build` - build the app
- `npm test` - run unit tests
- `npm run watch` - build in watch mode
- `npm run lint` - run linting

## Notes

- Notes are stored on the local device/browser storage.
- Clearing app storage will remove saved notes.
- The current Capacitor app id is `io.ionic.starter`.

## License

This project is for study and development purposes.