import React, { useState } from 'react';
import './signup.css';
import { Box, Container, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { CurrencyRupee, Person, PersonVideo3 } from 'react-bootstrap-icons';
// import { Helmet } from 'react-helmet-async';
import UserSignupForm from './components/user/UserSignupForm';
import EmailVerificationForm from './components/user/EmailVerificationForm';

const Signup = () => {
    const [mobileScreen] = useMediaQuery('(min-width: 850px)');
    const [token, setToken] = useState("");
    const [tokenExist, setTokenExist] = useState(false);
    const [tempEmail, setTempEmail] = useState("");

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

            <Container className='container' boxShadow={mobileScreen && 'xs'} mt={mobileScreen && 5} maxW='md'>
                {!tokenExist &&
                    <Box fontSize={22} className='bold-font' userSelect='none'>Signup as,</Box>
                }

                <Tabs variant='unstyled' mt={2}>
                    {!tokenExist &&
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
                            {!tokenExist ? <>
                                <UserSignupForm props={{
                                    setToken: setToken,
                                    setTokenExist: setTokenExist,
                                    setTempEmail: setTempEmail
                                }} />
                            </> : <>
                                <EmailVerificationForm props={{
                                    token: token,
                                    tempEmail: tempEmail
                                }} />
                            </>}
                        </TabPanel>

                        <TabPanel>
                            <p>Mentor signup</p>
                        </TabPanel>

                        <TabPanel>
                            <p>Investor signup</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </>
    )
}

export default Signup
