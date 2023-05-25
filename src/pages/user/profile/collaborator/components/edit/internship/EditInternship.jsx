import { Box, Button, Container, Flex, Icon, Image, VStack, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import ImageUploadLoader from '../../../../../../../components/loader/imageUploadLoader/ImageUploadLoader';
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';
import SelectInput from '../../../../../../../components/inputFields/selectInput/SelectInput';
import TextAreaInput from '../../../../../../../components/inputFields/textAreaInput/TextAreaInput';
import MoneyInput from '../../../../../../../components/inputFields/moneyInput/MoneyInput';
import ProductPhotoInput from '../../../../../../../components/inputFields/productPhotoInput/ProductPhotoInput';
import { ArrowLeft } from 'react-bootstrap-icons';

const EditInternship = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [photo, setPhoto] = useState("");
    const [photoSelected, setPhotoSelected] = useState(false);
    const photoRef = useRef("");
    const locationRef = useRef("");
    const [imageUploader, setImageUploader] = useState(false);
    const { isOpen: isImageUploader, onOpen: openImageUploader, onClose: closeImageUploader } = useDisclosure();
    const [credentials, setCredentials] = useState({
        internshipId: "",
        companyName: "",
        duration: "",
        stipends: "",
        description: "",
        certificate: ""
    });
    const options = [
        {
            label: "1 Month - 3 Months",
            value: "1 Month - 3 Months"
        },
        {
            label: "4 Months - 6 Months",
            value: "4 Months - 6 Months"
        },
        {
            label: "6 Months - 1 Year",
            value: "6 Months - 1 Year"
        },
        {
            label: "1 Year - 2 Years",
            value: "1 Year - 2 Years"
        },
    ]


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.companyName.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide the name of the company where you completed your internship",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return
        }

        if (credentials.duration.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please specify the duration of your internship",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return
        }

        if (credentials.stipends.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide the amount of stipend you received during your internship",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return
        }

        if (credentials.description.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide a description of your responsibilities and tasks during your internship",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return
        }

        if (credentials.certificate.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your internship certificate",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        let isImage = false;
        setPhotoSelected(false);
        setLoading(true);

        if (typeof credentials.certificate === 'object') {
            setImageUploader(true)
            openImageUploader();
            isImage = true;
        }

        const formData = new FormData();
        formData.append('internshipId', credentials.internshipId);
        formData.append('companyName', credentials.companyName);
        formData.append('duration', credentials.duration);
        formData.append('stipends', credentials.stipends);
        formData.append('description', credentials.description);
        formData.append('certificate', credentials.certificate);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateinternship',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: formData
            });

            setTimeout(() => {
                setImageUploader(false);
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate(-1)
                setLoading(false);
                closeImageUploader();
            }, isImage ? 5000 : 1000)
        } catch (error) {
            setLoading(false)
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const fetchInternship = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getinternship/${locationRef.current.internshipId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result[0];
            if (data) {
                setCredentials({
                    internshipId: data._id,
                    companyName: data.companyName,
                    duration: data.duration,
                    stipends: data.stipends,
                    description: data.description,
                    certificate: data.certificate
                });
                setPhoto(data.certificate);
                photoRef.current = data.certificate;
            }
            setLoadCompleted(true);
        } catch (error) {
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleRemove = () => {
        setPhoto("");
        setPhotoSelected(false)

        if (photoRef.current.length !== 0) {
            setPhoto(photoRef.current);
        }
    }

    useEffect(() => {
        if (location.state) {
            locationRef.current = location.state;
            if (locationRef.current.internshipId) {
                fetchInternship();
            }else{
                setLoadCompleted(true);
            }
        }
        // eslint-disable-next-line
    }, []);

    if (!location.state) {
        return (
            <>
                <Container boxShadow={!mobileScreen && 'xs'} p={4} maxW='xl'>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={NotFoundImage} w={200} />
                    </Flex>
                    <Flex justifyContent='center' mt={5} fontSize={18} color='var(--dark-grey-color)'>The page you are looking for does not exist.</Flex>
                </Container>
            </>
        )
    }

    if (loadCompleted) {
        return (
            <>
                <ImageUploadLoader props={{
                    isOpen: isImageUploader,
                    onOpen: openImageUploader,
                    onClose: closeImageUploader,
                    imageUploader
                }} />

                <Container maxW='xl' p={0} pb={20}>
                    <Box className='back-navigation-container' onClick={() => navigate(-1)} fontSize={mobileScreen ? '18px' : '22px'}>
                        <Icon as={ArrowLeft} />
                        <Box className='back-navigation-location'>Back</Box>
                    </Box>

                    <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>
                        <form onSubmit={handleSubmit}>

                            <VStack gap={0.5} mt={4}>
                                <TextInput props={{
                                    isRequired: true,
                                    label: "Company name",
                                    placeholder: "Zeptical",
                                    name: "companyName",
                                    value: credentials.companyName,
                                    onChange: onChange
                                }} />

                                <SelectInput
                                    props={{
                                        isRequired: true,
                                        label: "Internship work duration",
                                        placeholder: "Select Internship Duration",
                                        name: "duration",
                                        value: credentials.duration,
                                        onChange: onChange,
                                        options: options
                                    }}
                                />

                                <MoneyInput props={{
                                    isRequired: true,
                                    label: "Internship stipends",
                                    placeholder: "5000",
                                    name: "stipends",
                                    value: !credentials.stipends ? "" : parseInt(credentials.stipends),
                                    onChange: onChange
                                }} />

                                <TextAreaInput props={{
                                    isRequired: true,
                                    label: "Internship description",
                                    placeholder: "I completed assigned tasks and gained valuable experience during my internship.",
                                    name: "description",
                                    value: credentials.description,
                                    onChange: onChange
                                }} />

                                <ProductPhotoInput props={{
                                    label: "Internship certificate",
                                    name: "certificate",
                                    value: credentials.certificate,
                                    credentials: credentials,
                                    setCredentials: setCredentials,
                                    photo: photo,
                                    setPhoto: setPhoto,
                                    setPhotoSelected: setPhotoSelected
                                }} />
                            </VStack>

                            {photoSelected && !loading &&
                                <Button mt={2} w='100%' size='sm' onClick={handleRemove}>Remove Selected Photo</Button>
                            }

                            <Button
                                type='submit'
                                className='zeptical-red-fill-button'
                                mt={5}
                                w='100%'
                                isLoading={loading}
                                loadingText='Updating'
                            >
                                Update
                            </Button>
                        </form>
                    </Box>
                </Container>
            </>
        )
    } else {
        return (
            <Container maxW='xl' p='0' pb={20}>
                <SystemLoader />
            </Container>
        )
    }
}

export default EditInternship
