import { Box, Divider } from '@chakra-ui/react'
import React from 'react'
import SwitchPitch from './SwitchPitch'
import DeleteCollaborator from './DeleteCollaborator'

const CollaboratorSettings = ({ props }) => {
    return (
        <>
            <Box boxShadow='xs' borderRadius={5} p='10px 15px' mt={4}>

                <SwitchPitch props={props} />

                <Divider mt={2} orientation='horizontal' />

                <DeleteCollaborator props={props} />
            </Box>
        </>
    )
}

export default CollaboratorSettings
