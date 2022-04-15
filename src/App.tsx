import { Link } from 'react-router-dom'
import { useTodo, Filter } from './hooks/useTodo'

export const App: React.VFC = () => {
  const {
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
  } = useTodo()

  return (
    <div>
      <nav>
        <Link to="/todo">Todo</Link>
      </nav>
      <select
        defaultValue={'all'}
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      {filter === 'removed' ? (
        <button
          onClick={handleOnEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
      ) : (
        filter !== 'checked' && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleOnSubmit()
            }}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => handleOnChange(e)}
            />
            <input
              type="submit"
              value="追加"
              onSubmit={(e) => e.preventDefault()}
            />
          </form>
        )
      )}
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
