import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import SystemLoader from './components/loader/systemLoader/SystemLoader';
import BottomMobileNavbar from './components/bottomMobileNavbar/BottomMobileNavbar';
import { Container, Flex, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './slice/UserSlice';
import { AuthRoutes, GeneralRoutes } from './helper/ProtectedRoutes';
import Sidebar from './components/sidebar/Sidebar';
import RightSidebar from './components/rightSidebar/RightSidebar';

const Index = React.lazy(() => import('./pages/index/Index'));
const Login = React.lazy(() => import('./pages/auth/login/Login'));
const Information = React.lazy(() => import('./pages/information/Infromation'));
const UserForgotPassword = React.lazy(() => import('./pages/auth/forgotPassword/userForgotPassword/UserForgotPassword'))
const UserResetPassword = React.lazy(() => import('./pages/auth/resetPassword/user/UserResetPassword'));
const Signup = React.lazy(() => import('./pages/auth/signup/Signup'));
const UserHome = React.lazy(() => import('./pages/user/home/Home'));
const UserProfile = React.lazy(() => import('./pages/user/profile/Profile'));
const EditUserProfile = React.lazy(() => import('./pages/user/profile/editProfile/EditProfile'));
const EditCollaborator = React.lazy(() => import('./pages/user/profile/collaborator/components/edit/EditCollaborator'));
const CollaboratorProject = React.lazy(() => import('./pages/user/profile/collaborator/components/view/project/Project'));
const EditCollaboratorProject = React.lazy(() => import('./pages/user/profile/collaborator/components/edit/project/EditProject'));
const CollaboratorAchievement = React.lazy(() => import('./pages/user/profile/collaborator/components/view/achievement/Achievement'));
const EditCollaboratorAchievement = React.lazy(() => import('./pages/user/profile/collaborator/components/edit/achievement/EditAchievement'));
const CollaboratorInternship = React.lazy(() => import('./pages/user/profile/collaborator/components/view/internship/Internship'));
const EditCollaboratorInternship = React.lazy(() => import('./pages/user/profile/collaborator/components/edit/internship/EditInternship'));

function App() {
	const [mobileScreen] = useMediaQuery('(max-width: 850px)');
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const toast = useToast();
	const [isUser, setIsUser] = useState(null);

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

	useEffect(() => {
		if (user.globalUsername) {
			setIsUser(true);
		} else {
			setIsUser(false);
		}
	}, [user.globalUsername])

	return (
		<>
			<Header />
			<Container
				maxW='container.xl'
				as={!mobileScreen && Flex}
				gap={!mobileScreen && '20px'}
				padding={!mobileScreen ? '2vh 0' : 0}
			>
				{!mobileScreen && isUser &&
					<Sidebar />
				}

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
								<Route path=':username' element={<UserProfile />} />
								<Route path='editprofile' element={<EditUserProfile />} />
								<Route path='editcollaborator' element={<EditCollaborator />} />
								<Route path=':username/project' element={<CollaboratorProject />} />
								<Route path=':username/editproject' element={<EditCollaboratorProject />} />
								<Route path=':username/achievement' element={<CollaboratorAchievement />} />
								<Route path=':username/editachievement' element={<EditCollaboratorAchievement />} />
								<Route path=':username/internship' element={<CollaboratorInternship />} />
								<Route path=':username/editinternship' element={<EditCollaboratorInternship />} />
								{/* <Route path='collaborator' element={<CollaboratorProfile />} />

							<Route path='startupidea' element={<StartupIdeaProfile />} />
							<Route path='createstartupidea' element={<CreateStartupIdea />} /> 
							<Route path='editprofile' element={<EditProfileHead />} /> */}
							</Route>

						</Route>
					</Routes>
				</Suspense>

				{!mobileScreen && isUser &&
					<RightSidebar />
				}
			</Container>

			{mobileScreen && isUser &&
				<BottomMobileNavbar />
			}
		</>
	);
}

export default App;
