import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import homeRouter from './routes/home.js';
import userRouter from './routes/user.js';
import projectRouter from './routes/projects.js';
import collaboratorRouter from './routes/contributors.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/projects', projectRouter);
app.use('/contributors', collaboratorRouter);

const CONNECTION_URL = "mongodb+srv://charalambospan8:UVNhYgupOPXOMWwi@clusterssp.polppc4.mongodb.net/?retryWrites=true&w=majority";
 mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log(`Server running on port: 5000`)))
    .catch((error) => console.log(error.message));

