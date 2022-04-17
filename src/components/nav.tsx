import { Link } from 'react-router-dom'

const Nav: React.VFC = () => {
  return (
    <nav>
      <Link to="/">Top</Link> / <Link to="/todo">Todo</Link>
    </nav>
  )
}

export default Nav
