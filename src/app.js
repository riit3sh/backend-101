import express from 'express';

const app = express();
app.use(express.json());

import userRouter from '../routes/user.route.js';
import postRouter from '../routes/post.route.js';



app.use("/api/v1/users",userRouter);
//example route:https://localhost:4000/api/v1/users/register

app.use("/api/v1/posts",postRouter);

export default app;
