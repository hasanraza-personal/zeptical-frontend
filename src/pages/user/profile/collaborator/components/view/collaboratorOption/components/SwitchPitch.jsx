import { Box, Flex, Icon, Switch, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { People } from 'react-bootstrap-icons'
import CommonLoader from '../../../../../../../../components/loader/commonLoader/CommonLoader';
import axios from 'axios';

const SwitchPitch = ({ props }) => {
    const [pitchStatus, setPitchStatus] = useState();
    const toast = useToast();
    const { isOpen: isCommonLoaderOpen, onOpen: openCommonLoader, onClose: closeCommonLoader } = useDisclosure();
    const [message, setMessage] = useState("");

    const changeCollaboratorStatus = async () => {
        if (pitchStatus) {
            setMessage("Disabling your collaborator profile");
        } else {
            setMessage("Enabling your collaborator profile");
        }
        openCommonLoader();

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/collaborator/updatepitchstatus',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { pitchStatus: !pitchStatus }
            });

            setTimeout(() => {
                closeCommonLoader();
                setPitchStatus(!pitchStatus);
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 2000)
        } catch (error) {
            closeCommonLoader();
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
        setPitchStatus(props.userData.pitchStatus);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <CommonLoader props={{
                isOpen: isCommonLoaderOpen,
                onClose: closeCommonLoader,
                loadingMsg: message
            }} />

            <Flex gap={2} justifyContent='space-between'>
                <Box>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={People} fontSize={20} />
                        <Box lineHeight='normal' fontSize={16} fontFamily='var(--semiBold-font)'>
                            {pitchStatus ? "Disable" : "Enable"} collaborator profile
                        </Box>
                    </Flex>
                    <Box color='var(--dark-grey-color)' fontSize={14}>
                        If you disable your collaborator profile. Your collaborator profile will
                        still be visible to home page but stratup idea or startup product will
                        not be able to pitch you.
                    </Box>
                </Box>
                <Switch onChange={changeCollaboratorStatus} isChecked={pitchStatus} mt={1} />
            </Flex>
        </>
    )
}

export default SwitchPitch
