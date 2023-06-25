import React, { useEffect, useState } from 'react';
import client from '../client';
import BlockContent from '@sanity/block-content-to-react';
import { useParams } from 'react-router-dom';

const AuthorDetails = () => {
  const [authorDetail, setAuthorDetail] = useState(null);

  const { authorId } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "author" && _id == $authorId]{
          name,
          bio,
          image{
            asset->{
              _id,
              url
            },
          }
        }`,
        { authorId }
      )
      .then((data) => setAuthorDetail(data[0]))
      .catch(console.error);
  }, [authorId]);

  if (!authorDetail) return <div>Loading author details...</div>;

  const { name, bio, image } = authorDetail;

  return (
    <div>
      <h2>{name}</h2>
      <BlockContent blocks={bio} />
      {image && <img src={image.asset.url} alt={name} />}
    </div>
  );
};

export default AuthorDetails;