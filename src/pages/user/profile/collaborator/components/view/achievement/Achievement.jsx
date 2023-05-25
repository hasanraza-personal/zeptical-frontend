import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Container, Flex, Icon, Image, Stack, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import PreviousLocation from '../../../../../../../components/previousLocation/PreviousLocation';
import { Pencil, PlusLg, Trash } from 'react-bootstrap-icons';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import Alert from '../../../../../../../components/alert/Alert';

const Achievement = () => {
    /* cannot use ownerCredentials.username (ownerUsername when passed as props) 
    because this is page which gets rendered after a link is clicked */
    const location = useLocation();
    const path = location.pathname;
    const pathSegments = path.split('/');
    const username = pathSegments[2]

    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const [allAchievement, setAllAchievement] = useState([])
    const toast = useToast();
    const id = uuidv4();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const locationRef = useRef("");
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteAchievementId, setDeleteAchievementId] = useState("");

    const fetchAchievement = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/${username}/getachievement`,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data.result;
            if (data.achievement) {
                setAllAchievement(data.achievement);
            }
            setLoadCompleted(true);
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

    const handleDelete = async () => {
        if (deleteAchievementId.length === 0) {
            toast({
                position: 'top',
                title: "Something went wrong. Please refresh the page and try again.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setLoading(true);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/deleteachievement',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { achievementId: deleteAchievementId }
            });

            let newAchievement = allAchievement.filter(element => element._id !== deleteAchievementId);
            setDeleteAchievementId("");
            setTimeout(() => {
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setLoading(false);
                onClose();
                setAllAchievement(newAchievement);
            }, 1000)
        } catch (error) {
            setLoading(false)
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleLimitAchievement = () => {
        if (!toast.isActive(id)) {
            toast({
                id,
                position: 'top',
                title: "You can add upto 5 achievement only",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const openDeleteAlert = (achievementId) => {
        onOpen();
        setDeleteAchievementId(achievementId)
    }

    useEffect(() => {
        if (location.state) {
            locationRef.current = location.state;
        }
        fetchAchievement();
        // eslint-disable-next-line
    }, []);

    if (!location.state) {
        return (
            <>
                <Container boxShadow={!mobileScreen && 'xs'} p={4} maxW='xl'>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={NotFoundImage} w={200} />
                    </Flex>
                    <Flex justifyContent='center' mt={5} fontSize={18} color='var(--dark-grey-color)'>The page you are looking for does not exist.</Flex>
                </Container>
            </>
        )
    }

    if (loadCompleted) {
        return (
            <>
                <Alert props={{
                    isOpen,
                    onClose,
                    titleText: "Delete Achievement",
                    bodyText: "Are you sure? You want to delete this achievement. You can't undo this action afterwards.",
                    leftBtnText: "Close",
                    rightBtnText: "Delete Achievement",
                    rightBtnFn: handleDelete,
                    loading,
                    loadingText: "Deleting"
                }} />

                <Container maxW='xl' pb={20}>
                    <Box>
                        <PreviousLocation props={{ location: locationRef.current.previousLocation }} />
                    </Box>

                    {user.globalUsername === username &&
                        allAchievement.length < 5 ? <>
                        <Flex justifyContent='end'>
                            <Button
                                as={Link}
                                to={`/user/${username}/editachievement`}
                                state={{ achievementId: null }}
                                size='sm'
                                gap={2}
                                className='zeptical-original-fill-button'
                            >
                                <Icon as={PlusLg} />
                                <Box>Add Your Achievement</Box>
                            </Button>
                        </Flex>
                    </> : <>
                        <Flex justifyContent='end'>
                            <Button
                                size='sm'
                                gap={2}
                                className='zeptical-original-fill-button'
                                onClick={handleLimitAchievement}
                            >
                                <Icon as={PlusLg} />
                                <Box>Add Your Achievement</Box>
                            </Button>
                        </Flex>
                    </>
                    }

                    {allAchievement.length !== 0 ? <>
                        <Accordion defaultIndex={[0]} allowMultiple mt={4}>
                            {allAchievement.map((achievement, index) => (
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px' key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box>{achievement.name}</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Box pb={4}>
                                            <Stack gap={1}>
                                                <Flex justifyContent='space-between'>
                                                    <Box>
                                                        <Box>Competition name</Box>
                                                        <Box>{achievement.name}</Box>
                                                    </Box>
                                                    <Flex gap={4}>
                                                        <Link
                                                            as={Link}
                                                            to={`/user/${username}/editachievement`}
                                                            state={{ achievementId: achievement._id }}
                                                        >
                                                            <Icon as={Pencil} cursor='pointer' color='blue' fontSize={18} />
                                                        </Link>
                                                        <Icon as={Trash} cursor='pointer' color='red' fontSize={18} onClick={() => openDeleteAlert(achievement._id)} />
                                                    </Flex>
                                                </Flex>
                                                <Box>
                                                    <Box>Competition level</Box>
                                                    <Box>{achievement.level}</Box>
                                                </Box>
                                                <Box>
                                                    <Box>Competition description</Box>
                                                    <Box>{achievement.description}</Box>
                                                </Box>
                                                <Box>
                                                    <Box className='body-label'>Certificate photo</Box>
                                                    <Flex justifyContent='center' h='200px' border='2px dashed #5b00ff'>
                                                        <Image src={achievement.certificate} h='100%' />
                                                    </Flex>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </> : <>
                        <Box mt={!mobileScreen ? 20 : 10}>
                            <Flex as={LazyLoad} justifyContent='center'>
                                <Image src={NotFoundImage} w={200} />
                            </Flex>
                            <Box textAlign='center' mt={5}>No project information available</Box>
                        </Box>
                    </>}

                </Container>
            </>
        )
    } else {
        return (
            <Container maxW='xl' p='0' pb={20}>
                <SystemLoader />
            </Container>
        )
    }
}

export default Achievement
