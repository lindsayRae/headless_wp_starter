import Image from 'next/image';
import Link from 'next/link';

export default async function InstaFeed() {
  let instagramFeed = null;
  let error = null;

  try {
    // const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.IG_TOKEN}`;

    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.IG_TOKEN}`;

    const fakeDataURL =
      'http://jsonplaceholder.typicode.com/photos?_start=0&_limit=6';

    const data = await fetch(fakeDataURL);
    console.log('insta data - ', data);
    if (!data.ok) {
      throw new Error('Failed to fetch Instagram feed');
    }

    instagramFeed = await data.json();
    console.log('----------------- instagramFeed - ', instagramFeed);
  } catch (err) {
    console.error('Error fetching Instagram feed:', err.message);
    error = err.message;
  }

  return (
    <>
      {error && <p className='text-red-500'>{error}</p>}

      {instagramFeed && (
        <section className='mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8 flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-semibold'>Instagram Feed:</h2>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* {instagramFeed.data.map((post) => ( */}
            {instagramFeed.map((post) => (
              <div key={post.id} className='relative group w-full h-[300px]'>
                <Link
                  //   href={post.permalink?}
                  href='https://www.google.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative'
                >
                  {post.media_type === 'VIDEO' ? (
                    <video
                      src={post.media_url}
                      controls={false}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    // <Image
                    //   src={post.media_url}
                    //   alt={post.caption}
                    //   className='w-full h-full object-cover'
                    //   width={300}
                    //   height={300}
                    //   priority
                    // />
                    <Image
                      src={post.url}
                      alt={post.title}
                      className='w-full h-full object-cover'
                      width={300}
                      height={300}
                      priority
                    />
                  )}

                  <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full h-[300px]'>
                    <p className='text-white text-center text-xs truncate'>
                      {post.caption}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
