import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>📚 GATE Progress Tracker</h1>
      <div className="nav-links">
        <Link to="/" className="active">Dashboard</Link>
        <Link to="/dailytargets">Daily Targets</Link>
      </div>
    </nav>
  );
};

export default Navbar;
