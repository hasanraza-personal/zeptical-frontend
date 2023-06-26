import { Flex, Image } from '@chakra-ui/react';
import React from 'react'
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import collaboratorImage from '../../../../../../../../public/images/collaborator.png';
import showImage from '../../../../../../../../public/images/undraw/show.svg';

const CollaboratorInformation = () => {
    const previousLocation = "Profile";
    const infoData = [
        {
            title: "Want to showcase your skills and achievements to your friends?",
            image: showImage,
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            width: 270
        },
    ]
    return (
        <>
            <Flex
                as={Link} to="/information"
                state={{ infoData, previousLocation }}
                boxShadow='xs'
                alignItems='center'
                borderRadius={5}
                p='10px 15px'
                gap={5}
            >
                <Flex as={LazyLoad}>
                    <Image src={collaboratorImage} w={70} />
                </Flex>
                <Flex>
                    What is collaborator and how can i be collaborator?
                </Flex>
            </Flex>
        </>
    )
}

export default CollaboratorInformation
