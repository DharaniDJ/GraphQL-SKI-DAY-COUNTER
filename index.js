const { ApolloServer, gql } = require("apollo-server")
const { MockList } = require("@graphql-tools/mock")

// Takes Schema string and turns it to abstract syntax tree (AST)
const typeDefs = gql`
    # custom scalar, a customized value which have some semantic meaning
    scalar Date

    # object type
    # activity counter to track the number of days that we ski during a year
    type SkiDay {
        id:ID
        date:Date!
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

    #input type
    input AddDayInput{
        date: Date!
        mountain: String!
        conditions: Conditions
    }

    # custom object for returning
    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input:AddDayInput!): SkiDay   #Always nice to associate the input type, specifically with the name of the mutation.
        removeDay(id: ID!): RemoveDayPayload!   # take id of the day that we want to remove.
    }

    # https://www.apollographql.com/docs/apollo-server/data/subscriptions/
    # https://gist.github.com/ivanstnsk/a6c91c43e70c1d171c0d0500ef6a9493
    type Subscription {
        newDay: SkiDay!
    }
`;

// functions that are gone return data for the schema
// const resolvers = {

// }

const mocks = {
    Date: () => "1/2/2025",   // for Date return "1/2/2025"
    String: () => "Cool data", // for String return "Cool data"
    Query: () => ({
        allDays: () => new MockList([1,15])
    })
};

const server = new ApolloServer({
    typeDefs,
    // mocks: true // default mock data for the schema in place of resolvers
    mocks
})

server.listen().then(({url})=>console.log(`server running at ${url}`));