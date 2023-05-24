import React, { useEffect, useState } from 'react';
import styles from './photoinput.module.css';
import { Box, Flex, Image, Input } from '@chakra-ui/react';
import ImageLoader from '../../../public/gif/image-loader.gif';
import ImageError from '../../../public/images/image-error.jpg';

const PhotoInput = ({ props }) => {
    const [count, setCount] = useState(1);

    const changeProfilePhoto = (e) => {
        if (e.target.files[0]) {
            props.setPhoto(ImageLoader);
            setTimeout(() => {
                props.setCredentials({ ...props.credentials, [e.target.name]: e.target.files[0] });
                props.setPhoto(URL.createObjectURL(e.target.files[0]));
                props.setPhotoSelected(true)
            }, 1000)
        }
    }

    const fetchImage = () => {
        props.setPhoto(ImageLoader);

        if (count < 5) {
            setTimeout(() => {
                props.setPhoto(props.value)
                setCount((prevCount) => prevCount + 1)
            }, 1000)
        } else {
            props.setPhoto(ImageError)
        }
    }

    useEffect(() => {
        props.setPhoto(props.value);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Flex justifyContent='center'>
                <Box>
                    <Input type='file' name={props.name} className={styles.uploader_input} accept="image/*" onChange={changeProfilePhoto} />
                    <Flex justifyContent='center' alignItems='center' className={styles.uploader_mask}>
                        <Image src={props.photo} alt='photo' onError={fetchImage} objectFit='cover' borderRadius='full' boxSize='100px' />
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default PhotoInput
