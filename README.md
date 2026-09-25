# Currency Watcher — Frontend

React + Vite dashboard for tracking live currency exchange rates against a Go backend.

## Prerequisites

- Node.js 22 LTS (`node -v` to check)
- The backend running locally or deployed (see `/backend` and `/terraform` once built)

## Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` and set `VITE_API_BASE_URL` to wherever your backend is running
(`http://localhost:8080` for local dev, or your AWS URL once deployed).

## Run locally

```bash
npm run dev
```

Opens at http://localhost:5173.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Project structure

```
frontend/
  src/
    components/
      Header.jsx           top bar: title, backend status, refresh
      AddCurrencyForm.jsx   add a new base/target pair
      CurrencyCard.jsx      one tracked pair: rate + flash on change
      Dashboard.jsx         grid of CurrencyCards / empty state
      EmptyState.jsx        shown when no pairs are tracked
    hooks/
      useLocalStorage.js    persists tracked pairs across refreshes
    services/
      api.js                talks to the Go backend
    constants.js            currency code list for the pickers
    App.jsx                 app state, polling, wiring
    main.jsx                React entry point
    index.css               Tailwind + base styles
  index.html
  tailwind.config.js
  vite.config.js
```
