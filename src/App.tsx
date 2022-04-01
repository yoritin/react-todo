import React, { useState } from 'react'

type Todo = {
  value: string
  readonly id: number
  checked: boolean
  removed: boolean
}

export const App = () => {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

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

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleOnSubmit()
        }}
      >
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input
          type="submit"
          value="追加"
          onSubmit={(e) => e.preventDefault()}
        />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={(e) => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button onClick={(e) => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
