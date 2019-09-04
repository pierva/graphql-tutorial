// Demo user data
const users = [{
    id: '1',
    name: 'Piervalerio',
    email: 'pierva@example.com',
    age: 30
}, {
    id: '2',
    name: 'Jack',
    email: 'jack@example.com'
}, {
    id: '3',
    name: 'Jessica',
    email: 'jessica@example.com'
}
]

// Demo post data
const posts = [{
    id: '1',
    title: 'Beautiful pizza',
    body: 'Just look at my pictures',
    published: true,
    author: '1'
}, {
    id: '2',
    title: 'Learning graphql',
    body: 'Follow this course to learn all about GraphQL',
    published: true,
    author: '2'
}, {
    id: '3',
    title: 'How to make mother yeast for a perfect pizza',
    body: '',
    published: false,
    author: '1'
}]

// Demo comment data
const comments = [
    {
        id: '101',
        text: 'The best pizza ever',
        author: '1',
        post: '1'
    },
    {
        id: '102',
        text: 'This graphQl is fantastic',
        author: '3',
        post: '2'
    },
    {
        id: '103',
        text: 'Best pizza in Miami',
        author: '2',
        post: '1'
    },
    {
        id: '104',
        text: 'Love this course',
        author: '1',
        post: '2'
    }
]

const db = {
    users,
    posts,
    comments
}

export { db as default }