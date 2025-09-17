# Quote Generator

A simple web application for displaying and managing inspirational quotes.

## Features

- Display random quotes with improved randomization (no consecutive duplicates)
- Add new quotes via a user-friendly form
- Responsive design with improved accessibility
- Clean separation of concerns (HTML, CSS, JS)

## Setup and Running

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Accessibility Testing with Lighthouse

To run Lighthouse and check accessibility:

1. Open Chrome DevTools (F12)
2. Go to the "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Generate report"

Or use the Chrome Lighthouse extension for easier access.

## Improvements Made

### Frontend

- **Better randomization**: Implemented logic to avoid showing the same quote consecutively
- **Improved accessibility**: Enhanced color contrast for better readability
  - Quote text: Changed from `#444` to `#2c2c2c`
  - Author text: Changed from `#666` to `#4a4a4a`
  - Loading text: Changed from `#999` to `#6a6a6a`
  - Labels: Changed from `#333` to `#2c2c2c`

### Backend

- **Consistent formatting**: All quotes now use consistent multi-line formatting for better git version control
- **Proper file structure**: Uses `server.mjs` for explicit ES module indication
- **Better randomization**: Server-side logic prevents consecutive duplicate quotes

## API Endpoints

- `GET /` - Serves the frontend application
- `GET /api/quote` - Returns a random quote (JSON)
- `POST /api/quote` - Adds a new quote (requires `quote` and `author` in request body)
