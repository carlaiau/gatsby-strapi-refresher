import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const UserTemplate = ({ data }) => {

  const {bio, username, articles} = data.strapiUser

  return (
    <Layout>
      <h1>{username}</h1>
      <p>{bio}</p>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>
              <Link to={`/Article_${article.id}`}>{article.title}</Link>
            </h2>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
  
  
export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      bio
      articles {
        id
        title
      }
    }
  }
` 