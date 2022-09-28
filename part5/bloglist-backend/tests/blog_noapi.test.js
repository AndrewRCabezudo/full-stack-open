const blogUtils = require('../utils/for_testing')
const helper = require('./test_helper')


test('dummy returns one', () => {
  const blog = []

  const result = blogUtils.dummy(blog)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = blogUtils.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger, list is calculated right', () => {
    const result = blogUtils.totalLikes(helper.lotsOfBlogs)
    expect(result).toBe(36)
  })
})

describe('most blog', () => {

  test('calculated author with most blogs', () => {
    const result = blogUtils.mostBlogs(helper.lotsOfBlogs)
    expect(result).toEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
  })
})
describe('most likes', () => {

  test('calculated author with most likes', () => {
    const result = blogUtils.mostLikes(helper.lotsOfBlogs)
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 17 })
  })
})