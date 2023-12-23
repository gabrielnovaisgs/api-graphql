const { GraphQLScalarType } = require('graphql')

const userResolvers = {
    RolesType: {
        ESTUDANTE: "ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO"
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => value.toString(), //Trabalha com os dados vindos de qq banco
        parseValue: (value) => new Date(value), //Recupera os dados vindos de um Input de váriavel
        parseLiteral: (ast) => new Date(ast.value) //Recupera os dados vindos de um Input 
    }),
    Query: {
        users: (root, args, { dataSources }) => dataSources.usersApi.getUsers(),
        user: (root, { id }, { dataSources }) => dataSources.usersApi.getUserById(id)

    },
    Mutation: {
        adicionaUser: (root, novosDados, { dataSources }) =>
            dataSources.usersApi.adicionaUser(novosDados),
        atualizaUser: (root, novosDados, { dataSources }) => dataSources.usersApi.atualizaUser(user),
        deletaUser: (root, { id }, { dataSources }) => dataSources.usersApi.deletaUser(id)
    }
}

module.exports = userResolvers;