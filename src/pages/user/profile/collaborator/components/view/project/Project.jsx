import { Link as ChakraLink, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Container, Flex, Icon, Image, Stack, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, PencilSquare, PlusLg, Trash } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import LazyLoad from 'react-lazy-load';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import PreviousLocation from '../../../../../../../components/previousLocation/PreviousLocation';
import { v4 as uuidv4 } from 'uuid';
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Project = () => {
    /* cannot use ownerCredentials.username (ownerUsername when passed as props) 
    because this is page which gets rendered after a link is clicked */
    const location = useLocation();
    const path = location.pathname;
    const pathSegments = path.split('/');
    const username = pathSegments[2]

    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const [allProject, setAllProject] = useState([])
    const toast = useToast();
    const id = uuidv4();
    const [loadCompleted, setLoadCompleted] = useState(false);

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
                setAllProject(data.project);
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

    useEffect(() => {
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

    const { previousLocation } = location.state;

    if (loadCompleted) {
        return (
            <>
                <Container maxW='xl' pb={20}>
                    <Box>
                        <PreviousLocation props={{ location: previousLocation }} />
                    </Box>

                    {user.globalUsername === username &&
                        allProject.length !== 5 ? <>
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
                        <Accordion defaultIndex={[0]} allowMultiple mt={4}>
                            {allProject.map((project, index) => (
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px' key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box>{project.name}</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Flex justifyContent='end' gap={2}>
                                            <Button
                                                size='sm'
                                                gap={2}
                                                colorScheme='telegram'
                                                variant='outline'
                                            >
                                                <Icon as={PencilSquare} />
                                                <Box>Edit</Box>
                                            </Button>

                                            <Button
                                                size='sm'
                                                gap={2}
                                                colorScheme='red'
                                                variant='outline'
                                            >
                                                <Icon as={Trash} />
                                                <Box>Delete</Box>
                                            </Button>
                                        </Flex>

                                        <Box pb={4}>
                                            <Stack gap={1}>
                                                <Box>
                                                    <Box>Project name</Box>
                                                    <Box>{project.name}</Box>
                                                </Box>
                                                <Box>
                                                    <Box>Project description</Box>
                                                    <Box>{project.description}</Box>
                                                </Box>
                                                <Box>
                                                    <Box>Project Link</Box>
                                                    {
                                                        project.projectLink ? <>
                                                            <ChakraLink href={project.projectLink} isExternal>
                                                                <Box>{project.projectLink}<ExternalLinkIcon mx={1} /></Box>
                                                            </ChakraLink>
                                                        </> : <>
                                                            <Box>{"Not provided"}</Box>
                                                        </>
                                                    }

                                                </Box>
                                                <Box>
                                                    <Box>Github Link</Box>
                                                    <Box>{project.githubLink ? project.githubLink : "Not provided"}</Box>
                                                </Box>
                                                <Box>
                                                    <Box className='body-label'>Project photo</Box>
                                                    <Flex justifyContent='center' h='200px' border='2px dashed #5b00ff'>
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
