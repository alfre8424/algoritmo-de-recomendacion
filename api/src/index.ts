import express from 'express';
import AuthAPI from './presentation/api/auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import ProductController from './presentation/api/products';
import CartController from './presentation/api/cart';
import SurveyController from './presentation/api/survey';
import CommerceController from './presentation/api/commerce';

const app = express();
app.use(cors());
app.use(bodyParser.json());
// APIS
const authAPI = new AuthAPI();
const productAPI = new ProductController();
const cartAPI = new CartController();
const surveyAPI = new SurveyController();
const commerceAPI = new CommerceController();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authAPI.router);
app.use(productAPI.router);
app.use(cartAPI.router);
app.use(surveyAPI.router);
app.use(commerceAPI.router);

app.listen(process.env.API_PORT, () => {
  console.log(`Server started on port ${process.env.API_PORT}`);
});
