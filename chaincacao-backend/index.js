const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Supabase Initialization
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to ChainCacao Backend with Supabase!');
});

// Example Route: Fetch Data
app.get('/data', async (req, res) => {
  const { data, error } = await supabase.from('your_table').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});