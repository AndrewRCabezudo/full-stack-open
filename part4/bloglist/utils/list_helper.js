const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  // const reducer = (sum, item) => {
  //   return sum + item
  // }

  const total = blogs.reduce((acc = {}, currBlog = {}) => {
    acc.total = currBlog.likes + acc.total
    return acc
  },
  {
    total: 0
  })

  return blogs.length === 0
    ? 0
    : total.total
}

const favoriteBlog = (blogs) => {
  var mostLikedBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog
    }
  })
  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  var authors = []
  var index
  var maxAuthor
  blogs.forEach(blog => {
    if( !(authors.some(author => author.author === blog.author))) {
      authors.push({ 'author': blog.author, 'blogs': 1 })
    } else {
      index = authors.findIndex((auth => auth.author === blog.author))
      authors[index].blogs = authors[index].blogs + 1
    }
  })
  maxAuthor = { 'author': '', 'blogs': 0 }
  authors.forEach(a => {
    if (a.blogs > maxAuthor.blogs) {
      maxAuthor = a
    }
  })
  return maxAuthor
}

const mostLikes = (blogs) => {
  var authors = []
  var index
  var maxAuthor
  blogs.forEach(blog => {
    if( !(authors.some(author => author.author === blog.author))) {
      authors.push({ 'author': blog.author, 'likes': blog.likes })
    } else {
      index = authors.findIndex((auth => auth.author === blog.author))
      authors[index].likes = authors[index].likes + blog.likes
    }
  })
  maxAuthor = { 'author': '', 'likes': 0 }
  authors.forEach(a => {
    if (a.likes > maxAuthor.likes) {
      maxAuthor = a
    }
  })
  return maxAuthor
  // return an object that containes:

// {
//   author: name of author with most likes across all blogs
//   likes: total number of likes authors has across all blogs
// }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
