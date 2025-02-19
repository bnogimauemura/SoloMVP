require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');


const app = express();

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Fetch quiz questions from Supabase (make sure the function is async)
app.get('/api/quiz', async (req, res) => {
  try {
    const { data, error } = await supabase.from('quiz_questions').select('*');
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Fetch genres from Supabase
app.get('/api/genres', async (req, res) => {
  try {
    const { data, error } = await supabase.from('genres').select('*');
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Fetch artists from Supabase based on query parameters
app.get('/api/artists', async (req, res) => {
  const { genre, type = 'group', gender } = req.query;

  console.log('Received request with query params:', req.query);

  const normalizedType = type ? type.toLowerCase() : '';

  if (!genre || !type || !gender) {
    return res.status(400).send('Please provide valid genre, type and gender');
  }

  const validTypes = ['group', 'soloist'];
  if (!validTypes.includes(normalizedType)) {
    console.log('Invalid type:', type);
    return res.status(400).send(`Invalid type: ${type}. Valid types are 'group' and 'soloist'`);
  }

  // Fetch artists from Supabase based on genre, type, and gender
  try {
    const { data, error } = await supabase

      .from('artists')
      .select('*')
      .eq('genre', genre)
      .eq('type', normalizedType)
      .eq('gender', gender);

    if (error) {
      console.log('Error fetching artists:', error);
      return res.status(500).send('Error fetching artists');
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Sign-up Route (async function)
app.post('/api/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { user } = data;
    const { error: insertError } = await supabase.from('users').insert([
      { user_id: user.id, username, email }
    ]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    res.json({ message: 'Sign-up successful', user: data.user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Sign-in Route (async function)
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.json({ message: 'Sign-in successful', user: data.user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Profile Route (async function)
app.get('/api/profile', async (req, res) => {
  const user = req.user; // Assuming user is set by authentication middleware

  try {
    const { data, error } = await supabase.from('users').select('*').eq('user_id', user.id);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


PORT=8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
