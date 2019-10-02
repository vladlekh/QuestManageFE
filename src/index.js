import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { SnackbarProvider } from "notistack"
import { createMuiTheme } from "@material-ui/core";
import { store } from "./store/store";
import * as serviceWorker from './serviceWorker';
import './index.css';
import { App } from './App';

const defaultTheme = createMuiTheme();

ReactDOM.render(
	<Provider store={store}>
		<SnackbarProvider anchorOrigin={{
			vertical: 'top',
			horizontal: 'right'
		}}>
			<ThemeProvider theme={defaultTheme}>
				<App/>
			</ThemeProvider>
		</SnackbarProvider>
	</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
