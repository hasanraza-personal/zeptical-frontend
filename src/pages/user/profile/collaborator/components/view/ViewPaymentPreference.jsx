import { Box, Divider, Flex, Icon, Stack } from '@chakra-ui/react'
import React from 'react'
import { CurrencyRupee, Pencil } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';

const ViewPaymentPreference = ({ userData }) => {
    const previousLocation = 'Profile';

    return (
        <>
            <Box mt={4} px={4} py={2} boxShadow='xs' borderRadius={4}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={CurrencyRupee} />
                        <Box>Payment Preference</Box>
                    </Flex>

                    <Flex
                        as={Link}
                        to='/user/editcollaborator'
                        state={{ pageType: "paymentPreferenceDetails", previousLocation }}
                        alignItems='center'
                    >
                        <Icon as={Pencil} />
                    </Flex>
                </Flex>

                <Divider className='container-divider' />

                <Box>
                    <Stack gap={1}>
                        <Box>
                            <Box>What are your expectations when collaborating with a startup?</Box>
                            <Box>{userData.paymentPreference}</Box>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default ViewPaymentPreference
