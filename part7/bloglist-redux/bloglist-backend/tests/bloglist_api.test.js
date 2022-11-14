const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let authorization
let userId

beforeAll(async () => {
  const newUser = {
    username: 'Neo',
    name: 'Thomas Anderson',
    password: 'wyterabit',
  }

  const res = await api.post('/api/users').send(newUser)
  userId = JSON.parse(res.text).id

  const result = await api.post('/api/login').send(newUser)

  authorization = {
    Authorization: `bearer ${result.body.token}`,
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

afterAll(async () => {
  await User.findByIdAndRemove(userId)
})

describe('when there is initially some blogs', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
})

describe('viewing a specific blog', () => {
  test('blog identifiers are named id', async () => {
    const blogAtStart = await helper.blogsInDb()

    const blogToView = blogAtStart[0]
    const res = await api.get(`/api/blogs/${blogToView.id}`).expect(200)

    const id = res.body.id
    expect(id).toBeDefined()
  }, 100000)
})

describe('addition of a new blog', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: 'Sacred Fungi',
      author: 'Terence Kemp Mckenna',
      url: 'https://terencemckennaarchives.com/',
      likes: 93,
    }
    await api
      .post('/api/blogs')
      .set(authorization)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map((t) => t.title)
    expect(title).toContain('Sacred Fungi')
  })

  test('blog w/missing like property defaults to zero', async () => {
    const newBlog = {
      title: 'Sacred Fungi',
      author: 'Terence Kemp Mckenna',
      url: 'https://terencemckennaarchives.com/',
    }
    await api
      .post('/api/blogs')
      .set(authorization)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const nolikeBlog = blogsAtEnd
      .filter((value) => value.title === 'Sacred Fungi')
      .map((b) => b.likes)
    expect(nolikeBlog).toContain(0)
  })

  test('blog w/missing title and url property', async () => {
    const newBlog = {
      author: 'Terence Kemp Mckenna',
      likes: 93,
    }
    await api.post('/api/blogs').set(authorization).send(newBlog).expect(400)
    // .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('add blog w/unauthorized access', async () => {
    const newBlog = {
      title: 'Sacred Fungi',
      author: 'Terence Kemp Mckenna',
      url: 'https://terencemckennaarchives.com/',
      likes: 93,
    }
    await api.post('/api/blogs').send(newBlog).expect(401)
    // .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

// describe('deletion of a blog', () => {

//   test('a blog can be deleted', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToDelete = blogsAtStart[0]

//     await api
//       .delete(`/api/blogs/${blogToDelete.id}`)
//       .set(authorization)
//       .expect(204)

//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
//     const title = blogsAtEnd.map(t => t.title)
//     expect(title).not.toContain(blogToDelete.title)
//   })
// })

describe('update of a blog', () => {
  test('add more likes to a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updateValue = 9

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + updateValue,
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogToUpdate.likes + updateValue).toEqual(blogsAtEnd[0].likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
