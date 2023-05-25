import React from 'react';
import InternshipImage from '../../../../../../public/images/internship.png';
import { Box, Divider, Flex, Icon, Image, useMediaQuery } from '@chakra-ui/react';
import { PersonBadgeFill } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';


const ViewInternship = ({ ownerUsername }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';

    return (
        <>
            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={PersonBadgeFill} />
                        <Box>Internship</Box>
                    </Flex>
                </Flex>

                <Divider className='container-divider' />

                <Box py={2}>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={InternshipImage} w={mobileScreen ? 90 : 100} />
                    </Flex>
                    <Flex
                        justifyContent='center'
                        as={Link}
                        to={`/user/${ownerUsername}/internship`}
                        textAlign='center'
                        mt={1}
                        textDecoration='underline'
                        state={{ previousLocation }}
                    >
                        Click to view internship
                    </Flex>
                </Box>

            </Box>
        </>
    )
}

export default ViewInternship
