const { ApolloServer } = require('apollo-server-express')
const getResolvers = require('./resolvers')
const bodyParser = require(`body-parser`)
const getSchema = require('./schemas')
const express = require('express')
const debug = require(`debug`)(`qnzl:watchers:graph:index`)
const https = require(`https`)
const http = require(`http`)
const fs = require(`fs`)

const typeDefs = getSchema()
const resolvers = getResolvers()

debug(`creeating the graphql server`)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const {
      authorization,
      existaccesstoken: existAccessToken,
      todoistaccesstoken: todoistAccessToken,
      trelloaccesstoken: trelloAccessToken,
    } = req.headers

    return {
      authorization,
      [`x-exist-access-token`]: existAccessToken,
      [`x-todoist-access-token`]: todoistAccessToken,
      [`x-trello-access-token`]: trelloAccessToken,
    }
  },
  playground: true,
  introspection: true
})

const app = express()

app.use(bodyParser.json())

server.applyMiddleware({
  app
})

const port = process.env.PORT || 4000

debug(`creating the express server on port ${port}`)

if ('production' === process.env.ENV) {
  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/graph.maddie.today/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/graph.maddie.today/cert.pem')
  }, app).listen(port, () => {
    console.log(`Express server listening on port ${port}, ENV=production`)
  })
} else {
  http.createServer(app).listen(port, () => {
    console.log(`Express server listening on port ${port}, ENV=staging`)
  })
}
