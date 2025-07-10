# Skill-con

Skill-con is a web-based platform designed to eliminate job fraud and trust gaps in the freelance and artisan gig economy by providing secure, verified, and transparent end-to-end hiring experiences.

## Features

- User authentication (Firebase)
- Artisan and client onboarding
- Profile creation with portfolio uploads
- Job listing, matching, and application
- In-app messaging
- Split-payment escrow (Paystack)
- Ratings and reviews

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database & Auth:** Firebase
- **Payments:** Paystack
- **Media Storage:** Cloudinary

## Getting Started

### Backend

1. Install dependencies:
    ```bash
    npm install
    ```
2. Add your Firebase `serviceAccountKey.json` to the backend root.
3. Start the backend server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend server:
    ```bash
    npm start
    ```

## Folder Structure

```
/Skill-con
  /backend
  /frontend
  README.md
  package.json
  ...
```

## Environment Variables

- Create a `.env` file in both backend and frontend as needed for API keys and secrets.

## License

ISC

---