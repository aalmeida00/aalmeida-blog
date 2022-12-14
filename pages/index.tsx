import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-sa-east-1.hygraph.com/v2/clbcwkx9h19zz01t914oy9q6f/master'
);

const QUERY = gql`
  {
    posts {
      content
      createdAt
      datePublished
      id
      publishedAt
      slug
      title
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home(props: any) {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post: any) => (
          <h1>{post.title}</h1>
        ))}
      </main>
    </div>
  );
}
