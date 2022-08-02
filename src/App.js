import { graphql } from '@octokit/graphql';
import { useEffect, useState } from 'react';
import Discussions from './Discussion';

async function getRepository() {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const graphqlWithAuth = graphql.defaults({
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  });

  const { repository } = await graphqlWithAuth(
    `
    {
      repository(name: "agora-states-fe", owner: "codestates-seb") {
        discussions(first: 100) {
          edges {
            node {
              id
              title
              createdAt
              url
              author {
                login
                avatarUrl
              }
              category {
                name
              }
              answer {
                author {
                  login
                }
              }
            }
          }
        }
      }
    }
    `
  );

  return repository;
}

function App() {
  const [repository, setRepository] = useState({});

  const { discussions } = repository;
  useEffect(() => {
    getRepository().then((data) => {
      setRepository(data);
    });
  }, []);

  return (
    <div className='App'>
      <header>
        <h1>My Agora States</h1>
      </header>
      <div>
        {discussions !== undefined ? (
          <Discussions discussions={discussions.edges} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <footer>codestates</footer>
    </div>
  );
}

export default App;
