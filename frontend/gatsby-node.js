/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

const makeRequest = (graphql, query) => new Promise( (resolve, reject) => {
    // Query for node to use in creating pages
    resolve(
        graphql(query).then( result => {
            if (result.errors) reject(result.errors)
            
            return result
        })
    )
})

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ( { actions, graphql }) => {
    
    const { createPage } = actions

    const getArticles = makeRequest(
        graphql,
        `{
            allStrapiArticle {
                edges {
                    node {
                        id
                    }
                }
            }
        }`
    ).then( result => {
        // Create pages for each article
        result.data.allStrapiArticle.edges.forEach( ( {node} ) => {
            createPage({
                path: `/${node.id}`,
                component: path.resolve(`src/templates/article.js`),
                context: {
                    id: node.id
                }
            })
        })
    })  


    const getAuthors = makeRequest(
        graphql,
        `{
            allStrapiUser {
              edges {
                node {
                  id
                }
              }
            }
        }`
    ).then( result => {
        result.data.allStrapiUser.edges.forEach( ( {node} ) => {
            createPage({
                path: `/authors/${node.id}`,
                component: path.resolve(`src/templates/author.js`),
                context: {
                    id: node.id
                }
            })
        })
    })

    return Promise.all( [ getArticles, getAuthors ] )



}