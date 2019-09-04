const Comment = {
    // returns the author of the comment
    author(parent, args, { db }, info) {
        return db.users.find((user) => {
            return user.id === parent.author
        })
    },

    // returns the post the comment belongs to
    post(parent, args, { db }, info) {
        return db.posts.find((post) => {
            return post.id === parent.post
        })
    }
}

export { Comment as default }