import { Box, Container, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import './login.css';
import { CurrencyRupee, Person, PersonVideo3 } from 'react-bootstrap-icons';
import GoogleUserLogin from './components/user/GoogleUserLogin';
import UserLoginInformation from './components/user/UserLoginInformation';
import UserLoginForm from './components/user/UserLoginForm';
// import { Helmet } from 'react-helmet-async';
import UpdateUser from './components/user/UpdateUser';

const Login = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [userExistDB, setUserExistDB] = useState(null);

    const tabHead = [
        {
            icon: Person,
            title: "User"
        },
        {
            icon: PersonVideo3,
            title: "Mentor"
        },
        {
            icon: CurrencyRupee,
            title: "Investor"
        }
    ]

    return (
        <>
            {/* <Helmet>
                <title>Zeptical - Login or Signup</title>
                <meta name="description" content="Create an account or log into Zeptical." />
                <link rel='canonical' href='https://zeptical.com/login' />
                <meta name="keywords" content="Startup, Mentor, Investor, Collaborator, Social, Business, Idea, Product, Courage, Consistence, Hard Work, Motivation, Team, Friends, Social, Achievement" />
            </Helmet> */}

            <Container className='container' boxShadow={!mobileScreen && 'xs'} mt={!mobileScreen && 5} maxW='md'>
                {userExistDB !== false &&
                    <Box fontSize={22} className='bold-font' userSelect='none'>Login as,</Box>
                }
                <Tabs variant='unstyled' mt={2}>
                    {userExistDB !== false &&
                        <Flex as={TabList} justifyContent='space-between'>
                            {tabHead.map((data, index) => (
                                <Tab key={index} _selected={{ color: '#5B00FF', border: '1px solid #5B00FF' }} className='tab'>
                                    <Flex alignItems='center' gap={1.5} fontSize={16}>
                                        <Icon as={data.icon} />
                                        <Box fontFamily='Nunito-Bold'>{data.title}</Box>
                                    </Flex>
                                </Tab>
                            ))}
                        </Flex>
                    }
                    <TabPanels>
                        <TabPanel className='tab-panel'>
                            {userExistDB !== false ? <>
                                <UserLoginInformation />

                                <GoogleUserLogin props={{
                                    setUserExistDB: setUserExistDB
                                }} />

                                {/* This box is used for vertical spacing */}
                                <Box mt={6} />

                                <Box className='line-text'>
                                    <span>OR</span>
                                </Box>

                                <UserLoginForm />
                            </> : <>
                                <UpdateUser />
                            </>}
                        </TabPanel>
                        <TabPanel>
                            <p>Mentor login</p>
                        </TabPanel>

                        <TabPanel>
                            <p>Investor login</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container >
        </>
    )
}

export default Login
