import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './slice/UserSlice';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = configureStore({
	reducer: {
		user: userReducer,
	},
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ChakraProvider>
		<HelmetProvider>
			<BrowserRouter>
				<Provider store={store}>
					<GoogleOAuthProvider clientId='909941277236-l7t78f89v2sp3dk9eaoa0f9sduv8r0t4.apps.googleusercontent.com'>
						<App />
					</GoogleOAuthProvider>
				</Provider>
			</BrowserRouter>
		</HelmetProvider>
	</ChakraProvider>
);
