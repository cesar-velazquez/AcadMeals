import express from 'express';
import { enableCors } from "./config/plugins/cors.js";
import { globalErrorHandler } from './common/errors/error.Controller.js'; 
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { envs } from './config/enviroments/enviroments.js';
import morgan from 'morgan';

const app = express();

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3000',
    //agregar los origenes aceptados
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

if (envs.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (envs.NODE_ENV === 'production') {    
}

//definir rutas
app.use('/api/v1', router)

app.all('*', (req, res, next) => {
    return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
});


app.use(globalErrorHandler);


export default app;