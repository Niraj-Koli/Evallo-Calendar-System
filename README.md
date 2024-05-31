# Evallo-Calendar-System

## Configurations Steps

```
git clone https://github.com/Niraj-Koli/Evallo-Calendar-System
```

## Backend
Navigate To Backend Directory
```
cd backend
```
Install Dependencies
```
npm install
```
Create Environment Variables (.env)
```env
PORT= // Server Port //

MONGO_URL= // MongoDB Database URL //

CLIENT_ID= // Google Client ID //

CLIENT_SECRET= // Google Client Secret //

REDIRECT_URI= // Redirect URL In Google Settings //
```
Start Server
```
npm start
```

## Frontend
Navigate To Frontend Directory
```
cd frontend
```
Install Dependencies
```
npm install
```
Create Environment Variables (.env)
```env
VITE_GOOGLE_CLIENT_ID= // Google Client ID //

VITE_NODE_SERVER_URL= // Node Server URL //

VITE_GOOGLE_CALENDAR_API_KEY= // Google Calendar API Key //

VITE_GOOGLE_CALENDAR_ID= // Google Calendar ID //
````
Start Server
```
npm run dev
```



