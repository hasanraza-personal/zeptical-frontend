import { Box, Divider, Flex, Icon, Image, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FileTextFill } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import ProjectImage from '../../../../../../public/images/project.png';

const ViewProject = ({ userProject }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';

    return (
        <>
            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={FileTextFill} />
                        <Box>Project</Box>
                    </Flex>

                    {/* <Flex
                        as={Link}
                        to='/user/editcollaborator'
                        state={{ pageType: "locationDetails", previousLocation, userLocation }}
                        alignItems='center'
                    >
                        <Icon as={userLocation ? Pencil : PlusLg} />
                    </Flex> */}
                </Flex>

                <Divider className='container-divider' />

                <Box py={2}>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={ProjectImage} w={mobileScreen ? 90 : 100} />
                    </Flex>
                    <Box textAlign='center' mt={1} textDecoration='underline'>Add your project</Box>
                </Box>

                {/* <Box>
                    <Stack gap={1}>
                        <Box>
                            <Box>City</Box>
                            <Box>{userLocation?.userCity}</Box>
                        </Box>
                        <Box>
                            <Box>State</Box>
                            <Box>{userLocation?.userState}</Box>
                        </Box>
                    </Stack>
                </Box> */}
            </Box>
        </>
    )
}

export default ViewProject
