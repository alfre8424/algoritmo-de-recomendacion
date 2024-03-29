import { AppRouter } from 'presentation/routes/Router';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { store } from 'presentation/logic/redux_config';
import { Provider } from 'react-redux';
import 'styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
