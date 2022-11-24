import { createSlice } from '@reduxjs/toolkit'

export const coursesSlice = createSlice({
  name: 'counter',
  initialState: {
    courses: {},
    semester: 'f22',
    darkMode: false
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
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCourse, removeCourse, removeAllCourses, setStoreSemester, setDarkMode } = coursesSlice.actions

export default coursesSlice.reducer
