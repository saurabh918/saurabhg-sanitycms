import React, { useEffect, useState } from 'react'
// import { ImageUrlBuilder } from '@sanity/image-url'
import client from '../client'
import BlockContent from '@sanity/block-content-to-react'
import { useParams } from 'react-router-dom'

// const builder = ImageUrlBuilder(client)

// function urlFor(src) {
//   return builder.image(src)
// }

const BlogDetails = () => {
  const [blogDetail,setBlogDetail] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
		client
			.fetch(
				`*[slug.current == "${slug}"]{
      title,
      slug,
      publishedAt,
      body,
      bodySection2,
      mainImage{
        asset->{
          _id,
          url
        },
      },
    }`
			)
			.then((data) => setBlogDetail(data[0]))
			.catch(console.error);
	}, [slug]);

  if(!blogDetail) return <div>Loading...</div>
  console.log(blogDetail)
  return (
    <>
      <h2>{blogDetail.title}</h2>
      <div className='blog-info'>
      <img src={blogDetail.mainImage.asset.url} width="500px" height="300px" alt={blogDetail.title} />
      <BlockContent blocks={blogDetail.body} projectId={process.env.REACT_APP_PROJECT_ID} dataset={process.env.REACT_APP_DATASET}/>
      </div>
      <BlockContent blocks={blogDetail.bodySection2} projectId={process.env.REACT_APP_PROJECT_ID} dataset={process.env.REACT_APP_DATASET}/>
      <h3>{new Date(blogDetail.publishedAt).toLocaleString()}</h3>
    </>
  )
}

export default BlogDetails