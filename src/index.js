import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'


/*
 the 4 arguments that graphql provides in any of the resolvers are:
    parent, args, ctx, info
    parent keeps information about the parent element and are particulary 
    usefule when we have relation between custom types. Therefore in the 
    custom property in the resolvers, you can reference the parent to get 
    information about the related data.
    ctx (short hand for context) is a very powerful argument that allows 
    us to customize the application. Basically you can setup in context
    things like authentication (token), db connection, etc etc.
    To use the ctx argument, you need to pass another property to the 
    graphql server. This property will be called "context" and is an 
    object that contains all the data we want to pass across all the 
    functions in our application. After setting up the context properties
    you will then access them through the 3rd resolver argument, 
    conventionally called ctx. Therefore if you setup a property db on 
    the context object, you will access the db through ctx.db.
    It is common pattern to destructor the properties when naming the 
    argument in the method, therefore the third argument in the resolver
    method, will look something like this: { db }. This means we're taking
    only the db property off the context object.
*/

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('Server running')
})