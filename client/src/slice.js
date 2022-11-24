import { createSlice } from '@reduxjs/toolkit'

export const coursesSlice = createSlice({
  name: 'counter',
  initialState: {
    courses: {
      f22: {},
      w23: {}
    },
    semester: 'f22',
    darkMode: false
  },
  reducers: {
    addCourse: (state, action) => {
      state.courses[state.semester][action.payload.i] = { ...action.payload.course }
    },
    removeCourse: (state, action) => {
      delete state.courses[state.semester][action.payload.i]
    },
    removeAllCourses: (state) => {
      state.courses[state.semester] = {}
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
