const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (typeof body.title === 'undefined' || typeof body.url === 'undefined') {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  let match = false
  const user = request.user
  user.blogs.forEach((blog) => {
    if (blog.toString() === request.params.id) {
      match = true
    }
  })
  if (!match) {
    response.status(400).json({ error: 'blog does not belong to user' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedBlog) => {
      response.json(updatedBlog)
    })
    .catch((error) => next(error))
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: body.comment } },
    { new: true, runValidators: true, context: 'query', }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter
