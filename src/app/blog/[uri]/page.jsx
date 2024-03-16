import React, { Suspense } from 'react';
import Image from 'next/image';
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';
import Loading from '@/app/loading';
async function getPost(uri) {
  const query = `
        query getPostByURI($uri: ID!) {
            post(id:$uri, idType: URI) {
              title
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
    content
    categories {
      nodes {
        name
      }
    }
            }
          }
    `;
  const variables = {
    uri,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data } = await res.json();

  return data;
}
async function SinglePost({ params }) {
  const { post } = await getPost(params.uri);
  console.log('**', post);

  return (
    <div className='bg-white px-6 py-32 lg:px-8'>
      <Suspense fallback={<Loading />}></Suspense>
      <div className='mx-auto max-w-3xl text-base leading-7 text-gray-700'>
        <p className='text-base font-semibold leading-7 text-indigo-600'>
          {post.categories.nodes[0].name}
        </p>
        <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          {post.title}
        </h1>

        <div className='mt-10 max-w-2xl'>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
            className='prose lg:prose-lg !max-w-screen-md mx-auto '
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
