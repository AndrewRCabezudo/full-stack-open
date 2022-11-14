import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Andres Ricardo',
    url: 'testing.com',
    likes: '93',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(
    'Component testing is done with react-testing-library Andres Ricardo'
  )
  expect(element).toBeDefined()
})

test('clicking the button renders additonal content', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Andres Ricardo',
    url: 'testing.com',
    likes: '93',
    user: {
      name: 'John Snow',
      id: '5432234241',
    },
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText(
    'Component testing is done with react-testing-library Andres Ricardo'
  )
  expect(element).toBeDefined()
  const element2 = screen.getByText('testing.com')
  expect(element2).toBeDefined()
  const element3 = screen.getByText('likes 93')
  expect(element3).toBeDefined()
})

test('clicking the like button twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Andres Ricardo',
    url: 'testing.com',
    likes: '93',
    user: {
      name: 'John Snow',
      id: '5432234241',
    },
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const expandButton = screen.getByText('view')
  await user.click(expandButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
