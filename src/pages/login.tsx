import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation, useSetLocationMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { setAccessToken } from '../utils/accessToken';

const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    const [, setLocation] = useSetLocationMutation();
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {

                        await setAccessToken(response.data.login.accessToken as string);                        
                        setLocation({ location: "Online" });
                        if (typeof router.query.next === "string") {
                            window.location=router.query.next as unknown as Location;
                            // router.push(router.query.next);
                        } else {
                            window.location="/" as unknown as Location;
                            // router.push("/");
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Flex>
                            <NextLink href="/register">
                                <Link mr={'auto'}>
                                    Create Account
                                </Link>
                            </NextLink>
                            <NextLink href="/forgot-password">
                                <Link ml={'auto'}>
                                    Forgot Password?
                                </Link>
                            </NextLink>
                        </Flex>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal">
                            Login
                        </Button>
                    </Form>
                )}
            </Formik >
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Login);