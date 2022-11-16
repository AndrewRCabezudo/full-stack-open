
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog(state, action) {
      const data = action.payload
      state.push(data)
    },
    addLikeToBlog(state, action) {
      const id = action.payload
      const blogToUpdate = state.find(b => b.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }
      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog)
    },
    appendBlog(state,action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    addCommentToBlog(state, action) {
      const id = action.payload.id
      const blogToUpdate = state.find(b => b.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        comments: action.payload.comments,
      }
      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog)
    }
  },
})

export const { createBlog, addLikeToBlog, appendBlog, setBlogs, addCommentToBlog } = blogSlice.actions
export default blogSlice.reducer