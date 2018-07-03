import ReactDOM from 'react-dom';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import {
    makeMainRoutes
} from './routes';

const routes = makeMainRoutes();

ReactDOM.render(routes,document.getElementById('root'));
//registerServiceWorker();

/* import ReactDOM, { PropTypes } from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import {
    makeMainRoutes
} from './routes';

const store = createStore(rootReducer);
const routes = makeMainRoutes();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
); */