import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import SystemLoader from './components/loader/systemLoader/SystemLoader';

const Index = React.lazy(() => import('./pages/index/Index'));
const Login = React.lazy(() => import('./pages/auth/login/Login'));
const Information = React.lazy(() => import('./pages/information/Infromation'));
const UserForgotPassword = React.lazy(() => import('./pages/auth/forgotPassword/userForgotPassword/UserForgotPassword'))
const UserResetPassword = React.lazy(() => import('./pages/auth/resetPassword/user/UserResetPassword'));
const Signup = React.lazy(() => import('./pages/auth/signup/Signup'));

function App() {
	return (
		<>
			<Header />
			<Suspense fallback={<SystemLoader />}>
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='/login' element={<Login />} />
					<Route path='/information' element={<Information />} />
					<Route path='user/forgotpassword' element={<UserForgotPassword />} />
					<Route path='/user/resetpassword' element={<UserResetPassword />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
