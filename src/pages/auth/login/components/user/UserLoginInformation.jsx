import React from 'react';
import { Link } from 'react-router-dom';
import userImage from '../../../../../public/images/users.png';
import { Box, Flex, Image } from '@chakra-ui/react';
import LazyLoad from 'react-lazy-load';
import showImage from '../../../../../public/images/undraw/show.svg';
import teamCollaborationImage from '../../../../../public/images/undraw/team_collaboration.svg';
import ideaImage from '../../../../../public/images/undraw/idea.svg';
import productImage from '../../../../../public/images/undraw/product.svg';

const UserLoginInformation = () => {
    const infoData = [
        {
            title: "Want to showcase your skills and achievements to your friends?",
            image: showImage,
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            width: 270
        },
        {
            title: "Do you want to work in a Startup in its initial stage?",
            image: teamCollaborationImage,
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            width: 270
        },
        {
            title: "Do you have a Startup Idea and are you looking for people who can work with you?",
            image: ideaImage,
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            width: 150
        },
        {
            title: "Do you have a Startup Idea and are you looking for people who can work with you?",
            image: productImage,
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            width: 180
        },
    ]

    const previousLocation = "Login"

    return (
        <>
            <Flex as={Link} to="/information" state={{ infoData, previousLocation }} alignItems='center' boxShadow='xs' gap={3} p={2} borderRadius='5px'>
                <LazyLoad justifyContent='center'>
                    <Image src={userImage} alt='user' w='60px' />
                </LazyLoad>
                <Box fontSize={20} className='bold-font'>Who can be a user?</Box>
            </Flex>
        </>
    )
}

export default UserLoginInformation
