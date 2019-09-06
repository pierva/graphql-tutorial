import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('Email already taken')
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        // User doesn't exists
        if(userIndex === -1){
            throw new Error('User not found')
        }

        const deletedUser = db.users.splice(userIndex, 1)

        // Delete the posts beloging to the deleted user. If that post has comments, delete
        // all of them
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id
            if (match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }
            return !match
        })

        // Delete all the comments made by the deleted user, on posts made by someone else's
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUser[0]

    },

    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error('Email taken')
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },

    createPost(parent, args, { db, pubsub }, info){
        const userExits = db.users.some((user) => user.id === args.data.author)

        if(!userExits) {
            throw new Error('User not found')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)
        if(args.data.published) {
            pubsub.publish('post', {post})
        }

        return post
    },

    deletePost(parent, args, { db }, info){
        const postIndex = db.posts.findIndex((post) => post.id === args.id) 

        if(postIndex === -1) {
            throw new Error("Post not found")
        }

        const deletedPost = db.posts.splice(postIndex, 1)

        // Keep all the comments not belonging to deleted
        db.comments = db.comments.filter((comment) => comment.post !== args.id)

        return deletedPost[0]
    },

    updatePost(parent, args, { db, pubsub }, info ) {
        const { id, data } = args

        const post = db.posts.find((post) => post.id === id)

        if(!post) {
            throw new Error('Post not found')
        }

        if (typeof data.title === 'string'){
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body 
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published
            if(data.published) {
                pubsub.publish('post', {post})
            }
        }

        return post

    },

    createComment(parent, args, { db, pubsub }, info) {
        const userExits = db.users.some((user) => user.id === args.data.author)
        const validPost = db.posts.some((post) => post.id === args.data.post && post.published)

        if(!userExits) {
            throw new Error('User not found')
        }
        
        if(!validPost) {
            throw new Error('Post not published or not existing')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`, { comment })

        return comment
    },

    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if(commentIndex === -1){
            throw new Error("Comment not found")
        }

        const deletedComment = db.comments.splice(commentIndex, 1)

        return deletedComment[0]
    },

    updateComment(parent, args, { db }, info) {
        const { id, data } = args
        const comment = db.comments.find((comment) => comment.id === id)

        if(!comment) {
            throw new Error('Comment not found')
        }

        if(typeof data.text === 'string') {
            comment.text = data.text
        }

        return comment
    }
}

export { Mutation as default}