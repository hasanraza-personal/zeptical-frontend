import { Container, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import LazyLoad from 'react-lazy-load';
import under_development_img from '../../public/images/undraw/under_development.svg';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <>
            <Container>
                <Flex as={LazyLoad} justifyContent='center' mt={20}>
                    <Image src={under_development_img} alt='under development' width={60} />
                </Flex>
                <Flex justifyContent='center' className='sub-text' fontSize={20} mt={5}>
                    This website in under development
                </Flex>

                <Flex justifyContent='center' textDecoration='underline' mt={5} as={Link} to='/login'>Click here to login</Flex>
            </Container>
        </>
    )
}

export default Index
