import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { FaGoogle } from 'react-icons/fa';

import Loader from '../components/Loader';
import Footer from '../components/Footer';
import MainLogo from '../assets/logo.png';

import InstagramScreenshot from '../assets/d6bf0c928b5a.jpeg';
import InstagramPhones from '../assets/43cc71bb1b43.png';

const Login = () => {
    const intl = useIntl();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn, signInWithGoogle } = useFirebaseContext();
    const navigate = useNavigate();

    /**
     * Handle the form submission when the user tries to sign in.
     *
     * This function will prevent the default form submission behavior, set a loading
     * state, clear any previous error message, and validate the form fields. If any
     * field is missing, an error message will be shown. Otherwise, the sign-in
     * function will be called with the email and password provided. If successful,
     * the loading state will be reset and the user will be navigated to the home page.
     * If an error occurs, the loading state will be reset and the error message will
     * be displayed.
     *
     * @param {Event} event - The submit event triggered by the form submission.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorText('');

        if (email.length === 0 || password.length === 0) {
            setErrorText(
                intl.formatMessage({ id: 'auth_all_fields_required' })
            );
            setIsLoading(false);
            return;
        }

        signIn(email, password)
            .then(() => {
                setIsLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setIsLoading(false);
                // Remove from error message (Firebase:) and show it
                const errorString = error.message.substring(9).trim();
                setErrorText(errorString);
            });
    };

    /**
     * Handle the sign-in with Google button click event.
     *
     * This function will set a loading state and clear any previous error message.
     * It will then call the sign-in with Google function. If successful, the loading
     * state will be reset and the user will be navigated to the home page. If an
     * error occurs, the loading state will be reset and the error message will be
     * displayed.
     *
     * @param {Event} event - The click event triggered by the sign-in with Google button.
     */
    const handleSignInWithGoogle = (event) => {
        setIsLoading(true);
        setErrorText('');

        signInWithGoogle()
            .then(() => {
                setIsLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setIsLoading(false);
                const errorString = error.message.substring(9).trim();
                setErrorText(errorString);
            });
    };

    return (
        <>
            <Container>
                {isLoading && <Loader />}
                <ImageContainer>
                    <ImageWrapper>
                        <Image
                            src={InstagramPhones}
                            alt="Instagram phones"
                            loading="lazy"
                        />
                        <InstagramImages>
                            <InstagramImage
                                src={InstagramScreenshot}
                                alt="Instagram screenshot 1"
                                loading="lazy"
                            />
                        </InstagramImages>
                    </ImageWrapper>
                </ImageContainer>
                <FormContainer>
                    <Logo src={MainLogo} alt="main logo" loading="lazy" />
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={intl.formatMessage({
                                id: 'lbl_email',
                            })}
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder={intl.formatMessage({
                                id: 'lbl_password',
                            })}
                            required
                        />
                        <Button>
                            <FormattedMessage id="auth_login_lbl" />
                        </Button>
                    </Form>
                    <SeparatorContainer>
                        <SeparatorLine />
                        <OrText>
                            <FormattedMessage id="lbl_or" />
                        </OrText>
                        <SeparatorLine />
                    </SeparatorContainer>
                    <ProviderButton google onClick={handleSignInWithGoogle}>
                        <FaGoogle />
                        <FormattedMessage id="auth_login_with_google_lbl" />
                    </ProviderButton>
                    {errorText.length > 0 && (
                        <ErrorField>{errorText}</ErrorField>
                    )}
                    <ForgotPassword>
                        <FormattedMessage id="lbl_forgot_password" />
                    </ForgotPassword>
                    <RegisterContainer>
                        <RegisterText>
                            <FormattedMessage id="lbl_not_registered" />
                        </RegisterText>
                        <RegisterButton to="/accounts/signup">
                            <FormattedMessage id="auth_register_lbl" />
                        </RegisterButton>
                    </RegisterContainer>
                </FormContainer>
            </Container>
            <Footer />
        </>
    );
};

export default Login;

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

export const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ImageWrapper = styled.div`
    position: relative;
    width: 70%;
`;

export const Image = styled.img`
    width: 100%;
`;

export const InstagramImages = styled.div`
    position: absolute;
    top: 15%;
    left: 32.5%;
    grid-gap: 10px;
    width: 54.2%;
`;

export const InstagramImage = styled.img`
    width: 100%;
`;

export const FormContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.img`
    width: 200px;
    margin-bottom: 30px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #0095f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgb(24, 119, 242);
    }
`;

export const ErrorField = styled.p`
    color: red;
    padding-top: 20px;
    width: 300px;
    word-wrap: break-word;
    text-align: center;
    font-size: 14px;
`;

export const ForgotPassword = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: #003569;
    cursor: pointer;
`;

export const SeparatorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

export const SeparatorLine = styled.div`
    width: 130px;
    height: 1px;
    background-color: #dbdbdb;
`;

export const OrText = styled.span`
    margin: 0 10px;
    font-size: 14px;
    color: #8e8e8e;
`;

export const ProviderButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 30px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: ${(props) => (props.google ? '#fff' : '#385185')};
    color: ${(props) => (props.google ? '#000' : '#fff')};
    font-size: 14px;
    border: ${(props) => (props.google ? '1px solid black' : 'none')};
    outline: none;
    cursor: pointer;

    margin-top: 5px;
`;

export const RegisterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

export const RegisterText = styled.span`
    margin-right: 5px;
    font-size: 14px;
    color: #8e8e8e;
`;

export const RegisterButton = styled(Link)`
    border: none;
    background-color: transparent;
    color: rgb(0, 149, 246);
    font-size: 14px;
    text-decoration: none;
`;
