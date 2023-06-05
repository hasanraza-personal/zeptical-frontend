import { Box, Button, Container, Stack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import { useNavigate } from 'react-router-dom';
import SuggestionInput from '../../../../../../../components/inputFields/suggestionInput/SuggestionInput';
import SelectInput from '../../../../../../../components/inputFields/selectInput/SelectInput';
import { Percent } from 'react-bootstrap-icons';
import RightIconNumberInput from '../../../../../../../components/iconInputFields/rightIconNumberInput/RightIconNumberInput';
import RightTextNumberInput from '../../../../../../../components/iconInputFields/rightTextNumberInput/RightTextNumberInput';

const EditEducation = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState([]);
    const [collegeData, setCollegeData] = useState([]);
    const [streamData, setStreamData] = useState([]);
    const [qualificationSelected, setQualificationSelected] = useState(false);
    const [credentials, setCredentials] = useState({
        qualification: "",
        sscSchoolName: "",
        sscMarks: "",
        hscStream: "",
        hscCollegeName: "",
        hscMarks: "",
        diplomaStream: "",
        diplomaCollegeName: "",
        diplomaMarks: "",
        degreeStream: "",
        degreeCollegeName: "",
        degreeMarks: "",
    });

    const hscOptions = [
        {
            label: "Arts",
            value: "arts"
        },
        {
            label: "Commerce",
            value: "commerce"
        },
        {
            label: "Science",
            value: "science"
        }
    ]

    const qualificationOptions = [
        {
            label: "SSC",
            value: "SSC"
        },
        {
            label: "HSC",
            value: "HSC"
        },
        {
            label: "Diploma",
            value: "Diploma"
        },
        {
            label: "Degree",
            value: "Degree"
        }
    ]

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.qualification.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please select your current qualification",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        // Check credentials according to qualification
        if (credentials.qualification === 'SSC') {
            if (credentials.sscSchoolName.trim().length === 0) {
                toast({
                    position: 'top',
                    title: "Please provide your SSC school name",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }
        } else if (credentials.qualification === 'HSC') {
            if (credentials.hscStream.trim().length === 0 || credentials.hscCollegeName.trim().length === 0) {
                toast({
                    position: 'top',
                    title: "Please provide your HSC stream and college name",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }
        } else if (credentials.qualification === 'Diploma') {
            if (credentials.diplomaStream.trim().length === 0 || credentials.diplomaCollegeName.trim().length === 0) {
                toast({
                    position: 'top',
                    title: "Please provide your Diploma stream and college name",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }
        } else if (credentials.qualification === 'Degree') {
            if (credentials.degreeStream.trim().length === 0 || credentials.degreeCollegeName.trim().length === 0) {
                toast({
                    position: 'top',
                    title: "Please provide your Degree stream and college name",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }
        }

        let arrObj = [
            {
                course: {
                    stream: credentials.hscStream,
                    collegeName: credentials.hscCollegeName,
                    marks: credentials.hscMarks,
                },
                errMsg: "Please provide your HSC stream and college name"
            },
            {
                course: {
                    stream: credentials.diplomaStream,
                    collegeName: credentials.diplomaCollegeName,
                    marks: credentials.diplomaMarks,
                },
                errMsg: "Please provide your Diploma stream and college name"
            },
            {
                course: {
                    stream: credentials.degreeStream,
                    collegeName: credentials.degreeCollegeName,
                    marks: credentials.degreeMarks,
                },
                errMsg: "Please provide your Degree stream and college name"
            }
        ]

        for (let key in arrObj) {
            if ((arrObj[key].course.stream.trim().length !== 0 && arrObj[key].course.collegeName.trim().length === 0) ||
                (arrObj[key].course.stream.trim().length === 0 && arrObj[key].course.collegeName.trim().length !== 0)) {
                toast({
                    position: 'top',
                    title: arrObj[key].errMsg,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }

            if (arrObj[key].course.marks.trim().length !== 0 && (arrObj[key].course.stream.trim().length === 0 || arrObj[key].course.collegeName.trim().length === 0)) {
                toast({
                    position: 'top',
                    title: arrObj[key].errMsg,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }
        }

        let urlArrObj = [
            {
                value: credentials.sscSchoolName,
                linkPathName: "addschool",
                keyName: "school",
            },
            {
                value: credentials.hscCollegeName,
                linkPathName: "addcollege",
                keyName: "college",
            },
            {
                value: credentials.diplomaStream,
                linkPathName: "addstream",
                keyName: "stream",
            },
            {
                value: credentials.diplomaCollegeName,
                linkPathName: "addcollege",
                keyName: "college",
            },
            {
                value: credentials.degreeStream,
                linkPathName: "addstream",
                keyName: "stream",
            },
            {
                value: credentials.degreeCollegeName,
                linkPathName: "addcollege",
                keyName: "college",
            }
        ];
        setLoading(true);

        for (let key in urlArrObj) {
            if (urlArrObj[key].value.trim().length !== 0) {
                try {
                    await axios({
                        method: 'POST',
                        url: `/api/extras/${urlArrObj[key].linkPathName}`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        data: { [urlArrObj[key].keyName]: urlArrObj[key].value }
                    });
                } catch (error) {
                    toast({
                        position: 'top',
                        title: error.response.data.msg,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                    setLoading(false);
                    return;
                }
            }
        }

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateeducation',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    qualification: credentials.qualification,
                    ssc: {
                        schoolName: credentials.sscSchoolName,
                        marks: credentials.sscMarks
                    },
                    hsc: {
                        stream: credentials.hscStream,
                        collegeName: credentials.hscCollegeName,
                        marks: credentials.hscMarks,
                    },
                    diploma: {
                        stream: credentials.diplomaStream,
                        collegeName: credentials.diplomaCollegeName,
                        marks: credentials.diplomaMarks,
                    },
                    degree: {
                        stream: credentials.degreeStream,
                        collegeName: credentials.degreeCollegeName,
                        marks: credentials.degreeMarks,
                    }
                }
            });
            setTimeout(() => {
                setLoading(false);
                navigate(-1)
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 1000)
        } catch (error) {
            setLoading(false);
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const fetchUserEducation = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getusereducation`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.user;

            if (data.education) {
                let education = data.education;
                setCredentials({
                    qualification: education.qualification,
                    sscSchoolName: education.ssc.schoolName,
                    sscMarks: education.ssc.marks,
                    hscStream: education.hsc.stream,
                    hscCollegeName: education.hsc.collegeName,
                    hscMarks: education.hsc.marks,
                    diplomaStream: education.diploma.stream,
                    diplomaCollegeName: education.diploma.collegeName,
                    diplomaMarks: education.diploma.marks,
                    degreeStream: education.degree.stream,
                    degreeCollegeName: education.degree.collegeName,
                    degreeMarks: education.degree.marks
                });
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

    // Fetch school
    const fetchSchool = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/extras/getschool`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            setSchoolData(data)
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

    // Fetch college
    const fetchCollege = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/extras/getcollege`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            setCollegeData(data)
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

    // Fetch stream
    const fetchStream = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/extras/getstream`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            setStreamData(data)
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

    useEffect(() => {
        fetchUserEducation();
        fetchSchool();
        fetchCollege();
        fetchStream();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (credentials.qualification.length !== 0) {
            setQualificationSelected(true);
        } else {
            setQualificationSelected(false);
        }
    }, [credentials.qualification])

    if (loadCompleted) {
        return (
            <>
                <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>

                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>Your current qualification</Box>
                        <Stack gap={0.5} mt={2}>
                            <SelectInput
                                props={{
                                    isRequired: true,
                                    label: "Select your current qualification",
                                    placeholder: "Select qualification",
                                    name: "qualification",
                                    value: credentials.qualification,
                                    onChange: onChange,
                                    options: qualificationOptions
                                }}
                            />
                        </Stack>
                    </Box>

                    <br />

                    {qualificationSelected && <>
                        {/* SSC details */}
                        <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                            <Box fontFamily='var(--semiBold-font)'>
                                SSC details <span className='important_field_mark'> {credentials.qualification === 'SSC' && ' *'}</span>
                            </Box>
                            <Stack gap={0.5} mt={2}>
                                <SuggestionInput props={{
                                    isRequired: credentials.qualification === 'SSC' ? true : false,
                                    label: "School name",
                                    placeholder: "Don Bosco High School",
                                    name: "sscSchoolName",
                                    value: credentials.sscSchoolName,
                                    setCredentials: setCredentials,
                                    credentials: credentials,
                                    data: schoolData
                                }} />

                                <RightIconNumberInput props={{
                                    isRequired: false,
                                    label: "SSC percentage",
                                    icon: Percent,
                                    placeholder: "83",
                                    name: "sscMarks",
                                    value: credentials.sscMarks,
                                    onChange: onChange
                                }} />
                            </Stack>
                        </Box>

                        <br />

                        {/* HSC details */}
                        <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                            <Box fontFamily='var(--semiBold-font)'>
                                HSC details <span className='important_field_mark'> {credentials.qualification === 'HSC' && ' *'}</span>
                            </Box>
                            <Stack gap={0.5} mt={2}>
                                <SelectInput
                                    props={{
                                        isRequired: credentials.qualification === 'HSC' ? true : false,
                                        label: "Select your stream",
                                        placeholder: "Select stream",
                                        name: "hscStream",
                                        value: credentials.hscStream,
                                        onChange: onChange,
                                        options: hscOptions
                                    }}
                                />

                                <SuggestionInput props={{
                                    isRequired: credentials.qualification === 'HSC' ? true : false,
                                    label: "College name",
                                    placeholder: "Nirmala Memorial College",
                                    name: "hscCollegeName",
                                    value: credentials.hscCollegeName,
                                    setCredentials: setCredentials,
                                    credentials: credentials,
                                    data: collegeData
                                }} />

                                <RightIconNumberInput props={{
                                    isRequired: false,
                                    label: "HSC percentage",
                                    icon: Percent,
                                    placeholder: "83",
                                    name: "hscMarks",
                                    value: credentials.hscMarks,
                                    onChange: onChange
                                }} />
                            </Stack>
                        </Box>

                        <br />

                        {/* Diploma details */}
                        <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                            <Box fontFamily='var(--semiBold-font)'>
                                Diploma details <span className='important_field_mark'> {credentials.qualification === 'Diploma' && ' *'}</span>
                            </Box>
                            <Stack gap={0.5} mt={2}>
                                <SuggestionInput props={{
                                    isRequired: credentials.qualification === 'Diploma' ? true : false,
                                    label: "Stream",
                                    placeholder: "Computer Engineering",
                                    name: "diplomaStream",
                                    value: credentials.diplomaStream,
                                    setCredentials: setCredentials,
                                    credentials: credentials,
                                    data: streamData
                                }} />

                                <SuggestionInput props={{
                                    isRequired: credentials.qualification === 'Diploma' ? true : false,
                                    label: "College name",
                                    placeholder: "Bhausaheb Vartak Polytechnic",
                                    name: "diplomaCollegeName",
                                    value: credentials.diplomaCollegeName,
                                    setCredentials: setCredentials,
                                    credentials: credentials,
                                    data: collegeData
                                }} />

                                <RightIconNumberInput props={{
                                    isRequired: false,
                                    label: "Diploma percentage",
                                    icon: Percent,
                                    placeholder: "83",
                                    name: "diplomaMarks",
                                    value: credentials.diplomaMarks,
                                    onChange: onChange
                                }} />
                            </Stack>
                        </Box>

                        <br />

                        {/* Degree details */}
                        <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                            <Box fontFamily='var(--semiBold-font)'>
                                Degree details <span className='important_field_mark'> {credentials.qualification === 'Degree' && ' *'}</span>
                            </Box>
                            <Stack gap={0.5} mt={2}>
                                <SuggestionInput props={{
                                    isRequired: credentials.qualification === 'Degree' ? true : false,
                                    label: "Stream",
                                    placeholder: "Information Technology",
                                    name: "degreeStream",
                                    value: credentials.degreeStream,
                                    setCredentials: setCredentials,
                                    credentials: credentials,
                                    data: streamData
                                }} />

                                <SuggestionInput props={{
                                    isRequired: credentials.qualification === 'Degree' ? true : false,
                                    label: "College name",
                                    placeholder: "M.H. Saboo Siddik College of Engineering",
                                    name: "degreeCollegeName",
                                    value: credentials.degreeCollegeName,
                                    setCredentials: setCredentials,
                                    credentials: credentials,
                                    data: collegeData
                                }} />

                                <RightTextNumberInput props={{
                                    isRequired: false,
                                    label: "Degree percentage",
                                    textIcon: "CGPA",
                                    placeholder: "8.47",
                                    name: "degreeMarks",
                                    value: credentials.degreeMarks,
                                    onChange: onChange
                                }} />
                            </Stack>
                        </Box>

                        <Button
                            className='zeptical-red-fill-button'
                            mt={5}
                            w='100%'
                            isLoading={loading}
                            loadingText='Updating'
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    </>}

                </Box>
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

export default EditEducation
