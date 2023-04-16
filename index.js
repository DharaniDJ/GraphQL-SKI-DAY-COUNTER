const { ApolloServer, gql } = require("apollo-server")

// Takes Schema string and turns it to abstract syntax tree (AST)
const typeDefs = gql`
    # object type
    # activity counter to track the number of days that we ski during a year
    type SkiDay {
        id:ID
        date:String!
        mountain: String!
        conditions:Conditions
    }

    #Enumeration for what was it like to ski on this particular day
    enum Conditions {
        POWDER
        HEAVY
        ICE
        THIN
    }

    type Query{
        totalDays: Int!
        allDays:[SkiDay!]!   # query for all days to return ski day inside of this array
    }

    type Mutation {
        removeDay(id: ID!): SkiDay!
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