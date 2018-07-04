import React  from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import configureStore from "./redux/configureStore";
//import registerServiceWorker from './registerServiceWorker';
import {
    makeMainRoutes
} from './routes';


const routes = makeMainRoutes();
const Root = (props) => {
    const store = configureStore();
    return (
        <Provider store={store}>
            {routes}
        </Provider>
    );
}

ReactDOM.render(
    <Root/>
    ,document.getElementById('root')
);
//registerServiceWorker();
