import express from 'express';
import { config } from 'dotenv';
import { router as gamesRouter } from './routes/games.routes';
import { router as tournamentRouter } from './routes/simpleTournament.routes';
import mongoose from 'mongoose';

//DOTENV CONFIG
config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ROUTES
app.use('/api', gamesRouter);
app.use('/api', tournamentRouter);