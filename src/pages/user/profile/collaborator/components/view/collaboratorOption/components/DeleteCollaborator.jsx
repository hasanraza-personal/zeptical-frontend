import { Box, Flex, Icon, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { Trash } from 'react-bootstrap-icons'
import Alert from '../../../../../../../../components/alert/Alert';

const DeleteCollaborator = ({ props }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = async () => {
        setLoading(true);
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/collaborator/deletecollaborator',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            setTimeout(() => {
                props.setCollaboratorApplied(false);
                onClose();
                setLoading(false);
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 2000)
        } catch (error) {
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Alert props={{
                isOpen,
                onClose,
                titleText: "Delete Collaborator Profile",
                bodyText: "Are you sure? You want to delete your collaborator profile. Deleting collabortor profile will delete everything related to collaborator.",
                leftBtnText: "Close",
                rightBtnText: "Delete Collaborator Profile",
                rightBtnFn: handleDelete,
                loading,
                loadingText: "Deleting"
            }} />

            <Flex gap={2} mt={2} color='red' alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center' gap={2}>
                    <Icon as={Trash} fontSize={16} />
                    <Box lineHeight='normal' fontFamily='var(--semiBold-font)' fontSize={16}>Delete collaborator profile</Box>
                </Flex>
                <Box cursor='pointer' fontSize={14} onClick={onOpen}>Delete</Box>
            </Flex>
        </>
    )
}

export default DeleteCollaborator
