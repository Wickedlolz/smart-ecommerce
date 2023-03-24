import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const NewPost = ({ closeModal }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission
    };

    return (
        <Container>
            <Header>
                <Title>New Post</Title>
                <CloseButton onClick={closeModal}>
                    <AiOutlineClose />
                </CloseButton>
            </Header>
            <Form onSubmit={handleSubmit}>
                <ImagePreview src={image} />
                <ImageInput
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={handleImageChange}
                />
                <CaptionInput
                    type="text"
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={handleCaptionChange}
                />
                <Button type="submit">Post</Button>
            </Form>
        </Container>
    );
};

export default NewPost;

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 500px;
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ccc;
`;

const Title = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #777;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

const ImagePreview = styled.img`
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 16px;
`;

const ImageInput = styled.input`
    margin-bottom: 8px;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
`;

const CaptionInput = styled.textarea`
    margin-bottom: 16px;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    resize: none;
    height: 80px;
`;

const Button = styled.button`
    background-color: #0095f6;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;