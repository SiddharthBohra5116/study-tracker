import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="nav-heading">📚 Study Progress Tracker</h1>
      <div className="nav-links">
        <NavLink to="/" exact activeClassName="active">Dashboard</NavLink>
        <NavLink to="/dailytargets" activeClassName="active">Daily Targets</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
