import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Icon, Stack, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import { JournalText, Pencil, PlusLg } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ViewEducation = ({ userData, ownerUsername }) => {
    // eslint-disable-next-line
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';
    const user = useSelector((state) => state.user.value);

    return (
        <>
            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={JournalText} />
                        <Box>Education</Box>
                    </Flex>

                    {user.globalUsername === ownerUsername &&
                        <Flex
                            as={Link}
                            to='/user/editcollaborator'
                            state={{ pageType: "educationDetails", previousLocation }}
                            alignItems='center'
                        >
                            <Icon as={userData ? Pencil : PlusLg} />
                        </Flex>
                    }
                </Flex>

                <Divider className='container-divider' />

                {userData ? <>
                    <Box>
                        {userData.ssc.schoolName &&
                            <Box boxShadow='xs' borderRadius={8} p='14px 12px' mt={3}>
                                <Box fontFamily='var(--semibold-font)'>Current qualification</Box>
                                <Box>{userData.qualification}</Box>
                            </Box>
                        }

                        {userData.ssc.schoolName &&
                            <Accordion allowMultiple mt={3}>
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px'>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box className='accordian_title'>SSC details</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Stack gap={0.5} mt={0}>
                                            <Box>
                                                <Box>School name</Box>
                                                <Box>{userData.ssc.schoolName}</Box>
                                            </Box>
                                            <Box>
                                                <Box>Percentage</Box>
                                                <Box>{userData.ssc.marks ? `${userData.ssc.marks}%` : "Not provided"}</Box>
                                            </Box>
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        }

                        {userData.hsc.stream &&
                            <Accordion allowMultiple mt={3}>
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px'>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box className='accordian_title'>HSC details</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Stack gap={0.5} mt={0}>
                                            <Box>
                                                <Box>Stream</Box>
                                                <Box>{userData.hsc.stream}</Box>
                                            </Box>
                                            <Box>
                                                <Box>College name</Box>
                                                <Box>{userData.hsc.collegeName}</Box>
                                            </Box>
                                            <Box>
                                                <Box>Percentage</Box>
                                                <Box>{userData.hsc.marks ? `${userData.hsc.marks}%` : "Not provided"}</Box>
                                            </Box>
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        }

                        {userData.diploma.stream &&
                            <Accordion allowMultiple mt={3}>
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px'>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box className='accordian_title'>Diploma details</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Stack gap={0.5} mt={2}>
                                            <Box>
                                                <Box>Stream</Box>
                                                <Box>{userData.diploma.stream}</Box>
                                            </Box>
                                            <Box>
                                                <Box>College name</Box>
                                                <Box>{userData.diploma.collegeName}</Box>
                                            </Box>
                                            <Box>
                                                <Box>Percentage</Box>
                                                <Box>{userData.diploma.marks ? `${userData.diploma.marks}%` : "Not provided"}</Box>
                                            </Box>
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        }

                        {userData.degree.stream &&
                            <Accordion allowMultiple mt={3}>
                                <AccordionItem mb={2} border='1px solid #E2E8F0' borderRadius='5px'>
                                    <h2>
                                        <AccordionButton>
                                            <Flex justifyContent='space-between' w='100%'>
                                                <Box className='accordian_title'>Diploma details</Box>
                                                <AccordionIcon />
                                            </Flex>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Stack gap={0.5} mt={2}>
                                            <Box>
                                                <Box>Stream</Box>
                                                <Box>{userData.degree.stream}</Box>
                                            </Box>
                                            <Box>
                                                <Box>College name</Box>
                                                <Box>{userData.degree.collegeName}</Box>
                                            </Box>
                                            <Box>
                                                <Box>Percentage</Box>
                                                <Box>{userData.degree.marks ? `${userData.degree.marks} CGPA` : "Not provided"}</Box>
                                            </Box>
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        }
                    </Box>
                </> : <>
                    <Box textAlign='center' py={4}>
                        No education information available
                    </Box>
                </>}
            </Box >
        </>
    )
}

export default ViewEducation
