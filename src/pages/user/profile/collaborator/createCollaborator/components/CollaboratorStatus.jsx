import { Alert, AlertIcon, Flex } from '@chakra-ui/react'
import React from 'react'

const CollaboratorStatus = ({ props }) => {
    return (
        <>
            <Flex flexDirection='column' gap={2} mt={2}>
                {props.data.map((data, index) => (
                    <Alert p='10px 10px' status={data.status} borderRadius={5} variant='left-accent' key={index}>
                        <AlertIcon />
                        {data.msg}
                    </Alert>
                ))}
            </Flex>
        </>
    )
}

export default CollaboratorStatus
