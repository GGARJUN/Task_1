import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const UserInfo = styled.div({
  margin: '10px',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
});

const UserAvatar = styled.div({
  backgroundColor: '#888',
  borderRadius: '50%',
  color: '#fff',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  marginRight: '10px',
});

const UserDetails = styled.div({
  textAlign: 'left',
});

const UserName = styled.div({
  fontWeight: 'bold',
});

const UserEmail = styled.div({
  fontSize: '14px',
  color: '#555',
});


const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '250px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  textTransform:'capitalize',
  fontSize: 14,
  '& > h2': {
    marginBottom: '16px',
    textTransform:'capitalize',
    fontSize: 18,
  
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 120,
  backgroundColor: '#ecf0f1',
  border: 'none',
  color: '#2c3e50',
  fontSize: '18px',
  cursor: 'pointer',
  height: '40px',
  width: '40px',
  borderRadius: "50%"
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <CarouselContainer>
      <UserInfo>
        <UserAvatar>{post.user.initials}</UserAvatar>
        <UserDetails>
          <UserName>{post.user.name}</UserName>
          <UserEmail>{post.user.email}</UserEmail>
        </UserDetails>
      </UserInfo>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
