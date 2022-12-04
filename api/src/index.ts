import express from 'express';
import AuthAPI from './presentation/api/auth';

const app = express();

// APIS
const authAPI = new AuthAPI();

// MIDDLEWARES
app.use(authAPI.router);

app.listen(process.env.API_PORT, () => {
	console.log(`Server started on port ${process.env.API_PORT}`);
});
