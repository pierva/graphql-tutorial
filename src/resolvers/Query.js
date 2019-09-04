const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) return db.users

        return users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },

    posts(parent, args, { db }, info) {
        if (!args.query) return db.posts

        return db.posts.filter((post) => {
            const combined = post.title + post.body
            return combined.toLowerCase().includes(args.query.toLowerCase())
        })
    },

    comments(parent, args, { db }, info) {
        return db.comments
    },

    me() {
        return {
            id: '1234098',
            name: 'Pierva',
            email: 'pierva@example.com'
        }
    },

    post() {
        return {
            id: '12344',
            title: 'Something',
            body: 'Beautiful book',
            published: false
        }
    }
}

export { Query as default}