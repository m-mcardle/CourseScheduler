import { createSlice } from '@reduxjs/toolkit'

export const coursesSlice = createSlice({
  name: 'counter',
  initialState: {
    courses: {},
    semester: 'f22'
  },
  reducers: {
    addCourse: (state, action) => {
      state.courses[action.payload.i] = { ...action.payload.course }
    },
    removeCourse: (state, action) => {
      delete state.courses[action.payload.i]
    },
    removeAllCourses: (state) => {
      state.courses = {}
    },
    setStoreSemester: (state, action) => {
      state.semester = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCourse, removeCourse, removeAllCourses, setStoreSemester } = coursesSlice.actions

export default coursesSlice.reducer
