import { Box, Divider, Flex, Icon, Stack, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import { JournalText, Pencil, PlusLg } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ViewEducation = ({ userData, ownerUsername }) => {
    // eslint-disable-next-line
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';
    const user = useSelector((state) => state.user.value);

    const userEducation = [
        {
            available: userData?.ssc?.board && userData?.ssc?.schoolName ? true : false,
            heading: "SSC details",
            title1: "Board",
            value1: userData?.ssc?.board,
            title2: "School name",
            value2: userData?.ssc?.schoolName,
        },
        {
            available: userData?.hsc?.board && userData?.hsc?.collegeName ? true : false,
            heading: "HSC details",
            title1: "Board",
            value1: userData?.hsc?.board,
            title2: "College name",
            value2: userData?.hsc?.collegeName,
        },
        {
            available: userData?.diploma?.stream && userData?.diploma?.collegeName ? true : false,
            heading: "Diploma details",
            title1: "Stream",
            value1: userData?.diploma?.stream,
            title2: "College name",
            value2: userData?.diploma?.collegeName,
        },
        {
            available: userData?.degree?.stream && userData?.degree?.collegeName ? true : false,
            heading: "Degree details",
            title1: "Steam",
            value1: userData?.degree?.stream,
            title2: "College name",
            value2: userData?.degree?.collegeName,
        }
    ]

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
                        {userEducation.map((education, index) => (
                            <Box key={index}>
                                {education.available &&
                                    <Box boxShadow='xs' borderRadius={8} p='14px 12px' mt={3} key={index}>
                                        <Box fontFamily='var(--semiBold-font)'>{education.heading}</Box>
                                        <Stack gap={0.5} mt={2}>
                                            <Box>
                                                <Box>{education.title1}</Box>
                                                <Box>{education.value1}</Box>
                                            </Box>
                                            <Box>
                                                <Box>{education.title2}</Box>
                                                <Box>{education.value2}</Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                }
                            </Box>
                        ))}
                    </Box>
                </> : <>
                    <Box textAlign='center' py={4}>
                        No education information available
                    </Box>
                </>}
            </Box>
        </>
    )
}

export default ViewEducation
