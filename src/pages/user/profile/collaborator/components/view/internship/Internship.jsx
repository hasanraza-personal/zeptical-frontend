import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Container, Flex, Icon, Image, Stack, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import Alert from '../../../../../../../components/alert/Alert';
import PreviousLocation from '../../../../../../../components/previousLocation/PreviousLocation';
import { Pencil, PlusLg, Trash } from 'react-bootstrap-icons';

const Internship = () => {
    /* cannot use ownerCredentials.username (ownerUsername when passed as props) 
    because this is page which gets rendered after a link is clicked */
    const location = useLocation();
    const path = location.pathname;
    const pathSegments = path.split('/');
    const username = pathSegments[2];

    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const [allInternship, setAllInternship] = useState([])
    const toast = useToast();
    const id = uuidv4();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const locationRef = useRef("");
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteInternshipId, setDeleteInternshipId] = useState("");

    const fetchInternship = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/${username}/getinternship`,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data.result;
            if (data.internship) {
                setAllInternship(data.internship);
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
        if (deleteInternshipId.length === 0) {
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
                url: '/api/user/profile/deleteinternship',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { internshipId: deleteInternshipId }
            });

            let newInternship = allInternship.filter(element => element._id !== deleteInternshipId);
            setDeleteInternshipId("");
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
                setAllInternship(newInternship);
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

    const handleLimitInternship = () => {
        if (!toast.isActive(id)) {
            toast({
                id,
                position: 'top',
                title: "You can add upto 5 internships only",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const openDeleteAlert = (internshipId) => {
        onOpen();
        setDeleteInternshipId(internshipId)
    }

    useEffect(() => {
        if (location.state) {
            locationRef.current = location.state;
        }
        fetchInternship();
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
                    titleText: "Delete Internship",
                    bodyText: "Are you sure? You want to delete this internship. You can't undo this action afterwards.",
                    leftBtnText: "Close",
                    rightBtnText: "Delete Intenship",
                    rightBtnFn: handleDelete,
                    loading,
                    loadingText: "Deleting"
                }} />

                <Container maxW='xl' pb={20}>
                    <Box>
                        <PreviousLocation props={{ location: locationRef.current.previousLocation }} />
                    </Box>

                    {user.globalUsername === username &&
                        allInternship.length < 5 ? <>
                        <Flex justifyContent='end'>
                            <Button
                                as={Link}
                                to={`/user/${username}/editinternship`}
                                state={{ internshipId: null }}
                                size='sm'
                                gap={2}
                                className='zeptical-original-fill-button'
                            >
                                <Icon as={PlusLg} />
                                <Box>Add Your Internship</Box>
                            </Button>
                        </Flex>
                    </> : <>
                        <Flex justifyContent='end'>
                            <Button
                                size='sm'
                                gap={2}
                                className='zeptical-original-fill-button'
                                onClick={handleLimitInternship}
                            >
                                <Icon as={PlusLg} />
                                <Box>Add Your Internship</Box>
                            </Button>
                        </Flex>
                    </>
                    }

                    {allInternship.length !== 0 ? <>
                        <Accordion defaultIndex={[0]} allowMultiple mt={4}>
                            {allInternship.map((internship, index) => (
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px' key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box>{internship.companyName}</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Box pb={4}>
                                            <Stack gap={1}>
                                                <Flex justifyContent='space-between'>
                                                    <Box>
                                                        <Box>Company name</Box>
                                                        <Box>{internship.companyName}</Box>
                                                    </Box>
                                                    <Flex gap={4}>
                                                        <Link
                                                            as={Link}
                                                            to={`/user/${username}/editinternship`}
                                                            state={{ internshipId: internship._id }}
                                                        >
                                                            <Icon as={Pencil} cursor='pointer' color='blue' fontSize={18} />
                                                        </Link>
                                                        <Icon as={Trash} cursor='pointer' color='red' fontSize={18} onClick={() => openDeleteAlert(internship._id)} />
                                                    </Flex>
                                                </Flex>
                                                <Box>
                                                    <Box>Internship duration</Box>
                                                    <Box>{internship.duration}</Box>
                                                </Box>

                                                <Box>
                                                    <Box>Internship stipends</Box>
                                                    <Box>{internship.stipends}</Box>
                                                </Box>

                                                <Box>
                                                    <Box>Internship description</Box>
                                                    <Box>{internship.description}</Box>
                                                </Box>

                                                <Box>
                                                    <Box className='body-label'>Internship certificate</Box>
                                                    <Flex justifyContent='center' h='200px' border='2px dashed #5b00ff'>
                                                        <Image src={internship.certificate} h='100%' />
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

export default Internship
