const { ApolloServer, gql } = require("apollo-server")

// Takes Schema string and turns it to abstract syntax tree (AST)
const typeDefs = gql`
    type Query{
        totalDays: Int!
    }
`;

// functions that are gone return data for the schema
// const resolvers = {

// }

const server = new ApolloServer({
    typeDefs,
    mocks: true // mock data for the schema in place of resolvers
})

server.listen().then(({url})=>console.log(`server running at ${url}`));