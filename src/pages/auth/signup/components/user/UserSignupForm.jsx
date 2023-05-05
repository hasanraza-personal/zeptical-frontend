import React, { useState } from 'react'
import SelectInput from '../../../../../components/inputFields/selectInput/SelectInput'
import { Box, Button, VStack, useToast } from '@chakra-ui/react';
import TextInput from '../../../../../components/inputFields/textInput/TextInput';
import EmailInput from '../../../../../components/inputFields/emailInput/EmailInput';
import PasswordInput from '../../../../../components/inputFields/passwordInput/PasswordInput';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserSignupForm = ({ props }) => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const options = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        }
    ]

    const [credentials, setCredentials] = useState({
        userFullname: "",
        username: "",
        userEmail: "",
        userGender: "",
        userPassword: "",
        confirmPassword: ""
    });

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.userFullname.trim().length < 5) {
            toast({
                position: 'top',
                title: "Name should be atleast 5 characters long",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.username.trim().length < 5) {
            toast({
                position: 'top',
                title: "Username should be atleast 5 characters long",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.userEmail.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide an email",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (!isValidEmail(credentials.userEmail)) {
            toast({
                position: 'top',
                title: "Please provide a valid email address",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.userGender.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your gender",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.userPassword.length < 6) {
            toast({
                position: 'top',
                title: "Password must contain atleast 6 characters",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.userPassword !== credentials.confirmPassword) {
            toast({
                position: 'top',
                title: "Password does not matched",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        setLoading(true)

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/auth/createuser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    userFullname: credentials.userFullname,
                    username: credentials.username,
                    userEmail: credentials.userEmail,
                    userGender: credentials.userGender,
                    userPassword: credentials.userPassword,
                    confirmPassword: credentials.confirmPassword,
                }
            });
            const data = response.data
            console.log('data: ', data);

            setTimeout(() => {
                setLoading(false)
                props.setToken(data.authToken);
                props.setTokenExist(true);
                props.setTempEmail(data.userEmail)
            }, 500)
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <VStack gap={1.5}>
                    <TextInput props={{
                        isRequired: true,
                        label: "Fullname",
                        placeholder: "John Doe",
                        name: "userFullname",
                        value: credentials.userFullname,
                        onChange: onChange
                    }} />

                    <TextInput props={{
                        isRequired: true,
                        label: "Username",
                        placeholder: "johndoe536",
                        name: "username",
                        value: credentials.username,
                        onChange: onChange
                    }} />

                    <EmailInput props={{
                        isRequired: true,
                        label: "Email",
                        placeholder: "johndoe@gmail.com",
                        name: "userEmail",
                        value: credentials.userEmail,
                        onChange: onChange
                    }} />

                    <SelectInput
                        props={{
                            isRequired: true,
                            label: "Gender",
                            placeholder: "Select Gender",
                            name: "userGender",
                            value: credentials.userGender,
                            onChange: onChange,
                            options: options
                        }}
                    />

                    <PasswordInput props={{
                        isRequired: true,
                        label: "Password",
                        placeholder: "******",
                        name: "userPassword",
                        value: credentials.userPassword,
                        onChange: onChange
                    }} />

                    <PasswordInput props={{
                        isRequired: true,
                        label: "Confirm password",
                        placeholder: "******",
                        name: "confirmPassword",
                        value: credentials.confirmPassword,
                        onChange: onChange
                    }} />
                </VStack>

                <Button
                    type='submit'
                    className='zeptical-red-fill-button'
                    mt={5}
                    w='100%'
                    isLoading={loading}
                    loadingText='Please wait'
                >
                    Next
                </Button>
                <Box as={Link} to='/login'>Already have an account?</Box>
            </form>
        </>
    )
}

export default UserSignupForm
