
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
      return state.map(note =>
        note.id !== id ? note : updatedBlog)
    },
    appendBlog(state,action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const { createBlog, addLikeToBlog, appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer