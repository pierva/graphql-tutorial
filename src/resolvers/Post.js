const Post = {
    // returns the author of the post
    author(parent, args, { db }, info) {
        return db.users.find((user) => { 
            return user.id === parent.author
        })
    },
    // find all the comments for a specific post
    comments(parent, args, { db }, info) {
        return db.comments.filter((comment) => {
            return comment.post === parent.id
        })
    }
    
}

export { Post as default }