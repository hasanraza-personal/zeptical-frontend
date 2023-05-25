import React, { useEffect, useState } from 'react';
import styles from './productphotoinput.module.css';
import ImageLoader from '../../../public/gif/image-loader.gif';
import ImageError from '../../../public/images/image-error.jpg';
import { Box, FormControl, FormLabel, Image, Input } from '@chakra-ui/react';
import DefaultUploadImage from '../../../public/images/upload-image.png';

const ProductPhotoInput = ({ props }) => {
    const [count, setCount] = useState(1);

    const changeProductPhoto = (e) => {
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
            <FormControl>
                <FormLabel>{props.label}<span className='important_field_mark'> *</span></FormLabel>
                <Box width='100%'>
                    <Input type='file' accept="image/*" name={props.name} className={styles.project_uploader_input} onChange={changeProductPhoto} />
                    <Box className={styles.project_uploader_mask}>
                        <Image src={props.photo.length === 0 ? DefaultUploadImage : props.photo} alt='photo' onError={fetchImage} h={props.photo.length === 0 ? '75px' : '100%'} />
                    </Box>
                </Box>
            </FormControl>
        </>
    )
}

export default ProductPhotoInput
