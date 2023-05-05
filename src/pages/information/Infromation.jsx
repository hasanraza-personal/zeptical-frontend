import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container, Flex, Image, VStack, useMediaQuery } from '@chakra-ui/react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import './information.css'
import LazyLoad from 'react-lazy-load';
import notFoundImage from '../../public/images/undraw/not_found.svg';
import PreviousLocation from '../../components/previousLocation/PreviousLocation';

const Infromation = () => {
    const [mobileScreen] = useMediaQuery('(min-width: 850px)');
    const location = useLocation()

    if (location.state) {
        const { infoData, previousLocation } = location.state;

        return (
            <>
                <Container className='container' boxShadow={mobileScreen && 'xs'} maxW='md'>
                    <PreviousLocation props={{ location: previousLocation }} />

                    <Accordion defaultIndex={[0]} allowMultiple>
                        <VStack spacing={2} mt={2}>
                            {infoData.map((data, index) => (
                                <AccordionItem className='accordion' key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Box className='title'>
                                                {data.title}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Flex as={LazyLoad} justifyContent='center' my={6}>
                                            <Image src={data.image} w={data.width} />
                                        </Flex>
                                        <Box className='desc'>{data.desc}</Box>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </VStack>
                    </Accordion>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <Container className='container' boxShadow={mobileScreen && 'xs'} maxW='md'>
                    <Flex as={LazyLoad} justifyContent='center' my={6}>
                        <Image src={notFoundImage} w={200} />
                    </Flex>
                    <Flex justifyContent='center' fontSize={18} color='var(--dark-grey-color)'>No information is available right now</Flex>
                </Container>
            </>
        )
    }

}

export default Infromation
