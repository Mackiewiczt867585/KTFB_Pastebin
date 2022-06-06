import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Label, Icon } from 'semantic-ui-react';
import { LIKE, DISLIKE } from '../GraphQL/Mutations'
import { LOAD_POPULAR_PASTES, LOAD_PUBLIC_PASTES } from '../GraphQL/Queries';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
function LikeButton({ user, post: { id, likeCount, likes,email } }) {
  const [liked, setLiked] = useState(false);

  if (user == null) {
    user.email = 'null'
  }
  useEffect(() => {
    if (user && likes?.find((like) => like.email === user.email)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);


  const [likePost] = useMutation(LIKE, {
    variables: { copyId: id, email: user.email},
  refetchQueries: [LOAD_PUBLIC_PASTES, LOAD_POPULAR_PASTES]
});
  const [dislikePost] = useMutation(DISLIKE, {
    variables: { copyId: id, email: user.email },
    refetchQueries: [LOAD_PUBLIC_PASTES, LOAD_POPULAR_PASTES]
  });

  const likeButton = user ? (
    liked ? (
      <Button className='hearth'>
        <FaHeart />
      </Button>
    ) : (
      <Button className="hearth">
        <FaRegHeart />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login">
      <FaRegHeart />
    </Button>
  );

  return (
    liked ? (
    <Button as="div" onClick={dislikePost}>
      {likeButton}
    </Button>) : (
      <Button as="div" onClick={likePost}>
      {likeButton}
    </Button>
    )
  );
}



export default LikeButton;