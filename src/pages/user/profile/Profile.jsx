import { Box, Container, Flex, Icon, Image, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import { Pencil, Person, QrCode, RocketTakeoff } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Collaborator from './collaborator/Collaborator';

const Profile = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const previousLocation = "Profile";

    const tabHead = [
        Person,
        RocketTakeoff,
        QrCode
    ]

    return (
        <>
            <Container maxW='xl' p='0' >
                {!mobileScreen &&
                    <Box className='_page_title'>Profile</Box>
                }

                <Box mt={4} px={mobileScreen && 4}>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Flex alignItems='center' gap={3}>
                            <Box>
                                <Image src={user.globalUserPhoto} boxSize='60px' objectFit='cover' alt='Profile' borderRadius='full' />
                            </Box>
                            <Box>
                                <Box>{user.globalUserFullname}</Box>
                                <Box>{user.globalUsername}</Box>
                            </Box>
                        </Flex>
                        <Flex as={Link} to='/user/editprofile' state={{ previousLocation }} alignItems='center' cursor='pointer'>
                            <Icon as={Pencil} />
                        </Flex>
                    </Flex>

                    <Tabs size='lg' mt={4}>
                        <TabList p={0}>
                            {tabHead.map((value, index) => (
                                <Tab
                                    key={index}
                                    p='5px 0 5px 0' w='33.33%'
                                    _selected={{ color: '#5B00FF', borderColor: '#5B00FF' }}
                                    fontSize={20}
                                >
                                    <Icon as={value} />
                                </Tab>
                            ))}
                        </TabList>

                        <TabPanels py={1}>
                            <TabPanel p='5px 0'>
                                {/* Collaborator */}
                                <Collaborator />




                            </TabPanel>
                            <TabPanel p={0}>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel p={0}>
                                <p>three!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Box>


            </Container>
        </>
    )
}

export default Profile
