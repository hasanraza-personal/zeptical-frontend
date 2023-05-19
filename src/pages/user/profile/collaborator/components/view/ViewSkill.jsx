import { Box, Divider, Flex, Icon, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { Box2Fill, Pencil, PlusLg } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ViewSkill = ({ userSkill, props }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const previousLocation = 'Profile';
    const user = useSelector((state) => state.user.value);

    return (
        <>
            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={Box2Fill} />
                        <Box>Skill</Box>
                    </Flex>

                    {user.globalUsername === props.username &&
                        <Flex
                            as={Link}
                            to='/user/editcollaborator'
                            state={{ pageType: "skillDetails", previousLocation, userSkill }}
                            alignItems='center'
                        >
                            <Icon as={userSkill ? Pencil : PlusLg} />
                        </Flex>
                    }
                </Flex>

                {userSkill &&
                    <Divider className='container-divider' />
                }

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

export default ViewSkill
