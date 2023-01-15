import express from 'express';
import AuthAPI from './presentation/api/auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import ProductController from './presentation/api/products';

const app = express();
app.use(cors());

// APIS
const authAPI = new AuthAPI();
const productAPI = new ProductController();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(authAPI.router);
app.use(productAPI.router);

app.listen(process.env.API_PORT, () => {
	console.log(`Server started on port ${process.env.API_PORT}`);
});
