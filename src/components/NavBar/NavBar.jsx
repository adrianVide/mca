import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/exercise1">Min Max Range</Link>
        </li>
        <li>
          <Link to="/exercise2">Fixed Range</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
