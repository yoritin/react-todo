import React, { useState } from "react";

type Todo = {
  value: string
}

export const App = () => {

  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  const handleOnSubmit = () => {
    if (!text) return;
    const newTodo: Todo = {
      value: text,
    };

    setTodos([newTodo, ...todos])
    setText('')
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}>
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input
          type="submit"
          value="追加"
          onSubmit={(e) => e.preventDefault()}
        />
      </form>
    </div>
  );
};
