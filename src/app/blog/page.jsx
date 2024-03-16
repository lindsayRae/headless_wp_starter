'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '../loading';

async function getPosts() {
  const query = `
    {
      posts(first: 6) {
        nodes {
          title
          excerpt
          uri
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
    `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // ... any other headers you need to include (like authentication tokens)
      },
      // cache: 'no-store',
      // next: {
      //   revalidate: 0 //? bypass cache and fetch everything on each request..
      // }
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            From the blog
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {posts.map((post, index) => (
            <div key={index}>
              <Suspense fallback={<Loading />}>
                <Link href={`/blog/${post.uri}`}>
                  <article className='flex flex-col items-start justify-between'>
                    <div className='relative w-full'>
                      <img
                        src={post.featuredImage?.node.sourceUrl}
                        alt={post.featuredImage?.node.altText}
                        className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                      />
                      <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                    </div>
                    <div className='max-w-xl'>
                      <div className='mt-8 flex items-center gap-x-4 text-xs'>
                        {/* <time dateTime={post.datetime} className='text-gray-500'>
                    {post.date}
                  </time> */}
                        {post.categories.nodes[0].name}
                      </div>
                      <div className='group relative'>
                        <h3 className='mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600'>
                          <span className='absolute inset-0' />
                          {post.title}
                        </h3>
                        {/* //TODO */}
                        {/* <p
                          className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.slice(0, 200) + '...',
                          }}
                        /> */}
                      </div>
                      <div className='relative mt-8 flex items-center gap-x-4'>
                        {/* <img
                    src={post.author.imageUrl}
                    alt=''
                    className='h-10 w-10 rounded-full bg-gray-100'
                  /> */}
                        <div className='text-sm leading-6'>
                          <p className='font-semibold text-gray-900'>
                            {/* <a href={post.author.href}> */}
                            <span className='absolute inset-0' />
                            {/* {post.author.name} */}Lindsay Aiello
                            {/* </a> */}
                          </p>
                          <p className='text-gray-600'>
                            {post.author?.role || 'Lindsay Aiello'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </Suspense>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
