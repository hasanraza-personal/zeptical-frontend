import { Link as ChakraLink, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Container, Flex, Icon, Image, Stack, useMediaQuery, useToast, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Pencil, PlusLg, Trash } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import LazyLoad from 'react-lazy-load';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import PreviousLocation from '../../../../../../../components/previousLocation/PreviousLocation';
import { v4 as uuidv4 } from 'uuid';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Alert from '../../../../../../../components/alert/Alert';
import ImageModal from '../../../../../../../components/modal/imageModal/ImageModal';

const Project = () => {
    /* cannot use ownerCredentials.username (ownerUsername when passed as props) 
    because this is page which gets rendered after a link is clicked */
    const location = useLocation();
    const path = location.pathname;
    const pathSegments = path.split('/');
    const username = pathSegments[2]

    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const [allProject, setAllProject] = useState([])
    const toast = useToast();
    const id = uuidv4();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const locationRef = useRef("");
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteProjectId, setDeleteProjectId] = useState("");
    const [imageModal, setImageModal] = useState(null);
    const [imageLoader, setImageLoader] = useState(false);
    const { isOpen: isImageModalOpen, onOpen: openImageModal, onClose: closeImageModal } = useDisclosure();


    const fetchProject = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/${username}/getproject`,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data.result;
            if (data.project) {
                setAllProject(data.project.reverse());
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
        if (deleteProjectId.length === 0) {
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
                url: '/api/user/profile/deleteproject',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { projectId: deleteProjectId }
            });

            let newProject = allProject.filter(element => element._id !== deleteProjectId);
            setDeleteProjectId("");
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
                setAllProject(newProject);
            }, 1000)
        } catch (error) {
            setLoading(false);
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleLimitProject = () => {
        if (!toast.isActive(id)) {
            toast({
                id,
                position: 'top',
                title: "You can add upto 5 projects only",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const openDeleteAlert = (projectId) => {
        onOpen();
        setDeleteProjectId(projectId)
    }

    const viewImage = (image) => {
        setImageModal(image);
        setImageLoader(true);
        openImageModal();
    }

    useEffect(() => {
        if (location.state) {
            locationRef.current = location.state;
        }
        fetchProject();
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
                    titleText: "Delete Project",
                    bodyText: "Are you sure? You want to delete this project. You can't undo this action afterwards.",
                    leftBtnText: "Close",
                    rightBtnText: "Delete Project",
                    rightBtnFn: handleDelete,
                    loading,
                    loadingText: "Deleting"
                }} />

                <ImageModal props={{
                    isOpen: isImageModalOpen,
                    onClose: closeImageModal,
                    image: imageModal,
                    imageLoader,
                    setImageLoader
                }} />

                <Container maxW='xl' pb={20}>
                    <Box>
                        <PreviousLocation props={{ location: locationRef.current.previousLocation }} />
                    </Box>

                    {user.globalUsername === username &&
                        allProject.length < 5 ? <>
                        <Flex justifyContent='end'>
                            <Button
                                as={Link}
                                to={`/user/${username}/editproject`}
                                state={{ projectId: null }}
                                size='sm'
                                gap={2}
                                className='zeptical-original-fill-button'
                            >
                                <Icon as={PlusLg} />
                                <Box>Add Your Project</Box>
                            </Button>
                        </Flex>
                    </> : <>
                        <Flex justifyContent='end'>
                            <Button
                                size='sm'
                                gap={2}
                                className='zeptical-original-fill-button'
                                onClick={handleLimitProject}
                            >
                                <Icon as={PlusLg} />
                                <Box>Add Your Project</Box>
                            </Button>
                        </Flex>
                    </>
                    }

                    {allProject.length !== 0 ? <>
                        <Accordion allowMultiple mt={4}>
                            {allProject.map((project, index) => (
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px' key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box className='accordian_title'>{project.name}</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Box pb={4}>
                                            <Stack gap={1}>
                                                <Flex justifyContent='space-between'>
                                                    <Box>
                                                        <Box>Project name</Box>
                                                        <Box>{project.name}</Box>
                                                    </Box>
                                                    <Flex gap={4}>
                                                        <Link
                                                            as={Link}
                                                            to={`/user/${username}/editproject`}
                                                            state={{ projectId: project._id }}
                                                        >
                                                            <Icon as={Pencil} cursor='pointer' color='blue' fontSize={18} />
                                                        </Link>
                                                        <Icon as={Trash} cursor='pointer' color='red' fontSize={18} onClick={() => openDeleteAlert(project._id)} />
                                                    </Flex>
                                                </Flex>
                                                <Box>
                                                    <Box>Project description</Box>
                                                    <Box>{project.description}</Box>
                                                </Box>
                                                <Box>
                                                    <Box>Project Link</Box>
                                                    {
                                                        project.projectLink ? <>
                                                            <ChakraLink href={project.projectLink} isExternal>
                                                                {project.projectLink} <ExternalLinkIcon mx='2px' />
                                                            </ChakraLink>
                                                        </> : <>
                                                            <Box>{"Not provided"}</Box>
                                                        </>
                                                    }

                                                </Box>
                                                <Box>
                                                    <Box>Github Link</Box>
                                                    {
                                                        project.githubLink ? <>
                                                            <ChakraLink href={project.githubLink} isExternal>
                                                                {project.githubLink} <ExternalLinkIcon mx='2px' />
                                                            </ChakraLink>
                                                        </> : <>
                                                            <Box>{"Not provided"}</Box>
                                                        </>
                                                    }
                                                </Box>
                                                <Box>
                                                    <Box className='body-label'>Project photo</Box>
                                                    <Flex cursor='pointer' justifyContent='center' h='200px' border='2px dashed #5b00ff' onClick={() => viewImage(project.photo)}>
                                                        <Image src={project.photo} h='100%' />
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

export default Project
