# ChainCacao Backend

This is the backend for the ChainCacao project, built with Node.js, Express.js, and Supabase.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   SUPABASE_URL=https://your-supabase-url.supabase.co
   SUPABASE_KEY=your-supabase-key
   ```

3. **Run the Server**:
   ```bash
   npm run dev
   ```

4. **Endpoints**:
   - `GET /` : Welcome message.
   - `GET /data` : Fetch data from Supabase (replace `your_table` in the code with your actual table name).

## Project Structure

- `index.js` : Main server file.
- `.env` : Environment variables.
- `package.json` : Project dependencies and scripts.

## Dependencies

- `express`
- `@supabase/supabase-js`
- `dotenv`

## Dev Dependencies

- `nodemon`