import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <h1>This is the home page</h1>
    <p>These are articles</p>
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
          <Img fixed={document.node.image.childImageSharp.fixed}/>
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          content
        }
      }
    }
  }
`