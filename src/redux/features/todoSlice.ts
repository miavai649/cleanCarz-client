import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TTodo = {
  id: string
  title: string
  description: string
  priority: string
  isCompleted?: boolean
}

type TInitialState = {
  todos: TTodo[]
  filteredTodo: TTodo[]
  filter: string
}

const initialState: TInitialState = {
  todos: [],
  filteredTodo: [],
  filter: 'all' // default filter to show all todos
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false })
      state.filteredTodo =
        state.filter === 'all'
          ? state.todos
          : state.todos.filter((todo) => todo.priority === state.filter)
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      state.filteredTodo =
        state.filter === 'all'
          ? state.todos
          : state.todos.filter((todo) => todo.priority === state.filter)
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((todo) => todo.id === action.payload)
      task!.isCompleted = !task?.isCompleted
      state.todos = state.todos.sort(
        (a, b) => (a.isCompleted ? 1 : 0) - (b.isCompleted ? 1 : 0)
      )
      state.filteredTodo =
        state.filter === 'all'
          ? state.todos
          : state.todos.filter((todo) => todo.priority === state.filter)
    },
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      const task = state.todos.find((todo) => todo.id === action.payload.id)
      task!.title = action.payload.title
      task!.description = action.payload.description
      task!.priority = action.payload.priority
      state.filteredTodo =
        state.filter === 'all'
          ? state.todos
          : state.todos.filter((todo) => todo.priority === state.filter)
    },
    filterTodo: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
      state.filteredTodo =
        action.payload === 'all'
          ? state.todos
          : state.todos.filter((todo) => todo.priority === action.payload)
    }
  }
})

export const { addTodo, removeTodo, toggleComplete, updateTodo, filterTodo } =
  todoSlice.actions
export default todoSlice.reducer
