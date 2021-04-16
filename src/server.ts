import express from "express"
import { ApolloServer } from "apollo-server-express"
import depthLimit from "graphql-depth-limit"
import { createServer } from "http"
import compression from "compression"
import cors from "cors"
import schema from "./schema"
import { connect } from "./auth/database"

const app = express()
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    introspection: true,
    playground: true
})

app.use('*', cors())
app.use(compression())
server.applyMiddleware({ app, path: '/graphql' })

const PORT = process.env.PORT || 4004

connect()
app.get("/", (_, res) => res.send("Working"))

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)
httpServer.listen(
    { port: PORT },
    (): void => {
        // tslint:disable-next-line: no-console
        console.log(`\n🚀 GraphQL is now running on http://localhost:${PORT}/graphql`)
    }
)