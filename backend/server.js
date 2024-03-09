import express from 'express'
import cors from 'cors'
import { sequelize } from './sequelize.js';
import { userRouter } from './routers/usersRouter.js';
import { activitiesRouter } from './routers/activitiesRouter.js'
import { feedbackRouter } from './routers/feedbackRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api', userRouter);
app.use('/api', activitiesRouter);
app.use('/api', feedbackRouter);


app.listen(PORT,async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate()
    console.log('Connection has been established');
  } catch (err) {
    
  }
});
