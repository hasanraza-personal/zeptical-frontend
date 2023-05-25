import { Box, Divider, Flex, Icon, Image, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FileTextFill } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import ProjectImage from '../../../../../../public/images/project.png';
import { Link } from 'react-router-dom';

const ViewProject = ({ ownerUsername }) => {
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
                </Flex>

                <Divider className='container-divider' />

                <Box py={2}>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={ProjectImage} w={mobileScreen ? 90 : 100} />
                    </Flex>
                    <Flex
                        justifyContent='center'
                        as={Link}
                        to={`/user/${ownerUsername}/project`}
                        textAlign='center'
                        mt={1}
                        textDecoration='underline'
                        state={{ previousLocation }}
                    >
                        Click to view project
                    </Flex>
                </Box>

            </Box>
        </>
    )
}

export default ViewProject
