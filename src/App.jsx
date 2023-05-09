import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import SystemLoader from './components/loader/systemLoader/SystemLoader';
import BottomMobileNavbar from './components/bottomMobileNavbar/BottomMobileNavbar';
import { useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './slice/UserSlice';
import { AuthRoutes, GeneralRoutes } from './helper/ProtectedRoutes';

const Index = React.lazy(() => import('./pages/index/Index'));
const Login = React.lazy(() => import('./pages/auth/login/Login'));
const Information = React.lazy(() => import('./pages/information/Infromation'));
const UserForgotPassword = React.lazy(() => import('./pages/auth/forgotPassword/userForgotPassword/UserForgotPassword'))
const UserResetPassword = React.lazy(() => import('./pages/auth/resetPassword/user/UserResetPassword'));
const Signup = React.lazy(() => import('./pages/auth/signup/Signup'));
const UserHome = React.lazy(() => import('./pages/user/home/Home'));
const UserProfile = React.lazy(() => import('./pages/user/profile/Profile'));

function App() {
	const [mobileScreen] = useMediaQuery('(min-width: 850px)');
	const dispatch = useDispatch();
	const toast = useToast();

	const fetchUser = async () => {
		try {
			let response = await axios({
				method: 'GET',
				url: '/api/user/profile/getuser',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
			});
			const data = response.data.user
			if (data) {
				dispatch(login({
					globalUserFullname: data.userFullname,
					globalUsername: data.username,
					globalUserPhoto: data.userPhoto
				}))
			}
		} catch (error) {
			toast({
				position: 'top',
				title: error.response.data.msg,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			fetchUser()
		}
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<Header />
			<Suspense fallback={<SystemLoader />}>
				<Routes>
					<Route element={<GeneralRoutes />}>
						<Route path='/' element={<Index />} />
						<Route path='/login' element={<Login />} />
						<Route path='user/forgotpassword' element={<UserForgotPassword />} />
						<Route path='/user/resetpassword' element={<UserResetPassword />} />
						<Route path='/signup' element={<Signup />} />
					</Route>


					<Route path='/information' element={<Information />} />

					<Route element={<AuthRoutes />}>
						{/* <Route path='/user/home' element={<UserHome />} /> */}

						<Route path='/user' >
							<Route path='home' element={<UserHome />} />
							<Route path='profile' element={<UserProfile />} />

							{/* <Route path='collaborator' element={<CollaboratorProfile />} />
							<Route path='createcollaborator' element={<CreateCollaborator />} />

							<Route path='startupidea' element={<StartupIdeaProfile />} />
							<Route path='createstartupidea' element={<CreateStartupIdea />} /> 
							<Route path='editprofile' element={<EditProfileHead />} /> */}
						</Route>

					</Route>
				</Routes>
			</Suspense>
			{!mobileScreen &&
				<BottomMobileNavbar />
			}
		</>
	);
}

export default App;
