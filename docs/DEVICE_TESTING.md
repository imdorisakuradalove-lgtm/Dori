# Phase 1.1 — Real Device Acceptance Testing (Expo Go)

Documentation only — no app code changes. See the Phase 1.1 report in the
project conversation history for the full inspection and reasoning behind
this recommendation.

## Recommended method

**Expo Go on iPhone.** Nothing in the current Phase 1 code requires a
custom native build — see `AUDIT.md`/`docs/ARCHITECTURE.md` for the
approved stack, none of which needs native config beyond what Expo Go
already includes (expo-sqlite, expo-clipboard, expo-network, expo-symbols;
react-native-reanimated/worklets pinned at the versions Expo's own SDK 57
template generator selected).

## What you need

| Item | Required? |
|---|---|
| iPhone | Required |
| A computer (Windows, Mac, or Linux — any is fine) | Required — this session cannot run a dev server your phone can reach |
| Phone and computer on the same Wi-Fi network | Required |
| Node.js installed on the computer | Required (one-time) |
| "Expo Go" app from the App Store | Required |
| Free Expo account (expo.dev), logged in on both computer and phone | Required — Expo Go for SDK 57 will not load a project unless both sides are logged into the same account |
| Apple Developer Account | Not required |
| A Mac specifically | Not required |
| EAS Build / TestFlight | Not required |
| USB cable | Not required |

## From zero to testing

1. Download the project: on the computer, open the GitHub page for this
   repository, click the green "Code" button, choose "Download ZIP," then
   unzip it anywhere convenient (e.g. the Desktop).
2. Install Node.js: go to nodejs.org, download the "LTS" installer for
   your computer's operating system, and run it, clicking through the
   default options.
3. Open a terminal in the unzipped folder:
   - **Mac:** open the folder in Finder, right-click inside it, choose
     "New Terminal at Folder" (or open Terminal from Spotlight and type
     `cd ` followed by dragging the folder into the window, then press
     Enter).
   - **Windows:** open the folder in File Explorer, hold Shift and
     right-click inside it, choose "Open PowerShell window here."
4. Type `npm install` and press Enter. Wait for it to finish (a minute or
   two, no errors at the end).
5. Create a free account at expo.dev if you don't have one, then type
   `npx expo login` and press Enter; follow the on-screen prompt.
6. On the iPhone, install "Expo Go" from the App Store, open it, tap the
   avatar icon (top right), and log in with the same Expo account.
7. On the computer, type `npx expo start` and press Enter. A QR code
   appears in the terminal.
8. On the iPhone, open the Camera app and point it at the QR code, then
   tap the notification that appears (or use Expo Go's own "Scan QR Code"
   button on its Home tab).
9. Wait for the app to load. "Pocket Talk" (the app's current working
   name) should open to the Home screen.

If any step fails, see the full report in the conversation for the
specific "what to do if it fails" guidance for that step.

## The 10 acceptance tests

Run these in order, without rushing. See the conversation's Phase 1.1
report for the full checklist with pass/fail boxes — the short version:

1. Fresh launch opens without freezing or a blank screen.
2. Star a phrase in any Scene — it fills in.
3. That phrase appears in Favorites.
4. Force-close and reopen the app — the favorite is still there.
5. Un-star it in Favorites — it disappears immediately.
6. Change text size in Me, force-close and reopen — the choice stuck.
7. Airplane Mode on: Home, all 8 Scenes, Emergency, and Favorites all
   still show normally.
8. Still in Airplane Mode: Emergency's "Call police" tries to open the
   phone dialer.
9. Airplane Mode off: Home's status eventually says "Online" on its own.
10. Rapid-tap a star 8–10 times — it ends up in one sensible state, not
    stuck or duplicated.

**Pass condition:** all 10 behave as described, with no crash, freeze,
blank screen, or lost data anywhere in the sequence. Report failures using
the bug template in the Phase 1.1 report.
