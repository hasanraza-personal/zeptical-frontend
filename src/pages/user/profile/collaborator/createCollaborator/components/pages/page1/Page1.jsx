import React, { useState } from 'react'
import PreviousUserData from './components/PreviousUserData'

const Page1 = ({ props }) => {
    const [dataAvailable, setDataAvailable] = useState(false);
    
    return (
        <>
            <PreviousUserData props={props} />
        </>
    )
}

export default Page1
