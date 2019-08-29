import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { store } from "./store/store";
import * as serviceWorker from './serviceWorker';
import './index.css';
import { App } from './App';

ReactDOM.render(
	<Provider store={store}>
		<SnackbarProvider anchorOrigin={{
			vertical: 'top',
			horizontal: 'right'
		}}>
			<App/>
		</SnackbarProvider>
	</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
