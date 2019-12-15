const { ApolloServer } = require('apollo-server-express')
const getResolvers = require('./resolvers')
const getSchema = require('./schemas')
const express = require('express')

const typeDefs = getSchema()
const resolvers = getResolvers()

const server = new ApolloServer({ typeDefs, resolvers, playground: true, introspection: true })
const app = express()

server.applyMiddleware({ app })

app.listen(3007, () => {
  console.log("Listening on port 3007")
})
