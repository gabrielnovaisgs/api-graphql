const { ApolloServer } = require('apollo-server')
const userSchema = require('./user/schema/user.graphql')
const userResolvers = require('./user/resolvers/userResolver')
const UserAPI = require('./user/datasource/user')
const typeDefs = [userSchema]
const resolvers = [userResolvers]
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            usersApi: new UserAPI()
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`Servidor pollo na porta ${url}`)
})