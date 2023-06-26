import { Button, Flex, Image, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import React, { useState } from 'react'
import LinkModal from '../../../../../../../../components/modal/linkModal/LinkModal'
import LazyLoad from 'react-lazy-load';
import alertIcon from '../../../../../../../../public/images/alert.png';
import notFoundImage from '../../../../../../../../public/images/undraw/not_found.svg';

const RegisterCollaborator = () => {
    const { isOpen: isLinkModalOpen, onOpen: openLinkModal, onClose: closeLinkModal } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const descText = "On the homepage of the collaborator section, you can see the profile of the " +
        "collaborators. When you sign up as a collaborator, all the information you provide on your " +
        "profile will be displayed on the homepage. A strtup idea or startup product can pitch you. " +
        "Are you sure you want to register yourself as collaborator?";
    const alertMessageText = "If we come across any inappropriate details, we have the authority to " +
        "restrict your collaborator profile without providing any prior warning.";

    return (
        <>
            <LinkModal props={{
                isOpen: isLinkModalOpen,
                onClose: closeLinkModal,
                image: alertIcon,
                imgWidth: 100,
                title: "Read carefully",
                desc: descText,
                alertStatus: "warning",
                alertMessage: alertMessageText,
                urlPath: "/user/createcollaborator",
                setLoading,
                loading,
                loadingText: "Please wait"
            }} />

            <Flex as={LazyLoad} justifyContent='center' my={6}>
                <Image src={notFoundImage} w={mobileScreen ? 150 : 180} />
            </Flex>

            <Button
                onClick={openLinkModal}
                className='zeptical-red-empty-button'
                size='sm'
                w='100%'
            >
                Apply For Collaborator
            </Button>
        </>
    )
}

export default RegisterCollaborator
