import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './loading';

async function getPosts() {
  const query = `
  {
    posts(first: 3) {
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
      cache: 'no-store',
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}

export default async function Home() {
  const posts = await getPosts();
  //console.log('----', posts);

  return (
    <main className='min-h-screen p-24'>
      <Suspense fallback={<Loading />}>
        <div className='  '>
          <h1 className='text-3xl'>Hello World</h1>
          <p>Here is my blog from WP</p>
        </div>
        <div>
          {posts.map((post) => (
            <div key={post.uri} className='card mt-8 border rounded-lg p-3'>
              <Link href={`/post/${post.uri}`}>
                <h3 className='text-xl'>{post.title}</h3>

                {/* <img className="featuredImage" src={post.featuredImage?.node.sourceUrl}></img> */}
                <Image
                  className='featuredImage rounded'
                  src={post.featuredImage?.node.sourceUrl}
                  alt={post.featuredImage?.node.altText}
                  width='200'
                  height='200'
                ></Image>
              </Link>
            </div>
          ))}
        </div>
      </Suspense>
    </main>
  );
}
