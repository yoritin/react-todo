import { useState } from 'react'

type Todo = {
  value: string
  readonly id: number
  checked: boolean
  removed: boolean
}

export type Filter = 'all' | 'checked' | 'unchecked' | 'removed'

export const useTodo = () => {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  const handleOnSubmit = () => {
    if (!text) return
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }

    setTodos([newTodo, ...todos])
    setText('')
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }))

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }))

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }))

    const removeTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed
      }
      return todo
    })

    setTodos(removeTodos)
  }

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed)
    setTodos(newTodos)
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed
      case 'checked':
        return todo.checked && !todo.removed
      case 'unchecked':
        return !todo.checked && !todo.removed
      case 'removed':
        return todo.removed
    }
  })

  return {
    text,
    todos,
    filter,
    setFilter,
    handleOnSubmit,
    handleOnChange,
    handleOnEdit,
    handleOnCheck,
    handleOnRemove,
    handleOnEmpty,
    filteredTodos,
  }
}
