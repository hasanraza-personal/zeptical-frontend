import { Box, Divider, Flex, Icon, Image, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { TrophyFill } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import AchievementImage from '../../../../../../public/images/achievement.png';
import { Link } from 'react-router-dom';

const ViewAchievement = ({ ownerUsername }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';

    return (
        <>
            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={TrophyFill} />
                        <Box>Achievement</Box>
                    </Flex>
                </Flex>

                <Divider className='container-divider' />

                <Box py={2}>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={AchievementImage} w={mobileScreen ? 75 : 100} />
                    </Flex>
                    <Flex
                        justifyContent='center'
                        as={Link}
                        to={`/user/${ownerUsername}/achievement`}
                        textAlign='center'
                        mt={2}
                        textDecoration='underline'
                        state={{ previousLocation }}
                    >
                        Click to view achievement
                    </Flex>
                </Box>

            </Box>
        </>
    )
}

export default ViewAchievement
