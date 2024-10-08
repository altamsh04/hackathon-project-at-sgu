import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import connectDB from './db/db.js';
import authenticateToken from './middleware/auth.middleware.js';
import authRouter from './routes/auth.route.js';
import projectRouter from './routes/project.route.js';
import protectedRouter from './routes/protected.route.js';
import taskRouter from './routes/task.route.js';
import imageRouter from './routes/upload.route.js';
import usersRouter from './routes/user.route.js';

const app = express();

connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/api/auth', authRouter);
app.use('/api/protected', protectedRouter);
app.use('/api/upload', imageRouter);
app.use('/api/project', projectRouter);
app.use('/api/', usersRouter);
app.use('/api/', taskRouter);

app.get('/', authenticateToken, (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: "User Headers Authorization" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
