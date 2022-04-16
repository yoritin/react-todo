import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages'
import Todo from './pages/todo'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
