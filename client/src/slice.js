import { createSlice } from '@reduxjs/toolkit'

export const coursesSlice = createSlice({
  name: 'counter',
  initialState: {
    courses: {},
  },
  reducers: {
    addCourse: (state, action) => {
      state.courses[action.payload.i] = { ...action.payload.course }
    },
    removeCourse: (state, action) => {
      delete state.courses[action.payload.i]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCourse, removeCourse } = coursesSlice.actions

export default coursesSlice.reducer
