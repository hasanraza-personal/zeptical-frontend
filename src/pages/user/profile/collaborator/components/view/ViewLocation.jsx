import { Box, Divider, Flex, Icon, Stack, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { GeoAltFill, Pencil, PlusLg } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ViewLocation = ({ userData, ownerUsername }) => {
    // eslint-disable-next-line
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';
    const user = useSelector((state) => state.user.value);

    return (
        <>
            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={GeoAltFill} />
                        <Box>Location</Box>
                    </Flex>

                    {user.globalUsername === ownerUsername &&
                        <Flex
                            as={Link}
                            to='/user/editcollaborator'
                            state={{ pageType: "locationDetails", previousLocation }}
                            alignItems='center'
                        >
                            <Icon as={userData ? Pencil : PlusLg} />
                        </Flex>
                    }
                </Flex>

                <Divider className='container-divider' />

                {userData ? <>
                    <Box>
                        <Stack gap={1}>
                            <Box>
                                <Box>City</Box>
                                <Box>{userData?.userCity}</Box>
                            </Box>
                            <Box>
                                <Box>State</Box>
                                <Box>{userData?.userState}</Box>
                            </Box>
                        </Stack>
                    </Box>
                </> : <>
                    <Box textAlign='center' py={4}>
                        No location information available
                    </Box>
                </>}
            </Box>
        </>
    )
}

export default ViewLocation
