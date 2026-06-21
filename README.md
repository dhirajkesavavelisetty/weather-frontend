# SkyCast Frontend

Frontend for the SkyCast weather application.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS

## Features

- Search weather by city
- Current temperature
- Humidity
- Wind speed
- Weather condition icons
- Loading and error states
- Responsive UI

## Live Demo

https://weather-frontend-nine-sooty.vercel.app/

## Backend
https://github.com/dhirajkesavavelisetty/weather-backend

This frontend communicates with the SkyCast backend API.

## Local Setup

### 1. Clone the repository

```bash
git clone <https://github.com/dhirajkesavavelisetty/weather-frontend>
cd weather-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env.local` file

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```text
app/
  page.tsx
public/
README.md
```

## Future Improvements

- 7-day forecast
- Better weather icons
- Search history
- Geolocation support

## Author
Dhiraj Kesava Velisetty
