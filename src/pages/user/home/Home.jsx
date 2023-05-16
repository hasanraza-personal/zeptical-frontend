import { Box, Container, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    return (
        <>
            <Container maxW='xl' p='0' >
                {!mobileScreen &&
                    <Box className='_page_title'>Home</Box>
                }
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
                Home Data<br />
            </Container>
        </>
    )
}

export default Home
