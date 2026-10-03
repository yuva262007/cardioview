import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">

      <NavLink to="/" className="navbar-logo">
        <div className="logo-icon">
          ♥
        </div>

        <div className="logo-text">
          <span>Cardio</span>View
          <small>HEALTH ANALYTICS</small>
        </div>
      </NavLink>

      <div className="navbar-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/assessment"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Assessment
        </NavLink>

        <NavLink
          to="/anatomy"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Heart Anatomy
        </NavLink>

      </div>

      <div className="navbar-actions">

        <button className="theme-button">
          ☀
        </button>

        <button className="profile-button">
          Y
        </button>

      </div>

    </nav>
  )
}

export default Navbar