import {NavDropdown} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
const Navbar =()=> {
    return(
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

    <div className="navbar-nav" >
      
        <NavDropdown title="Root of Equation" id="nav-dropdown" fontSize="30">
          <ul>
          <li><NavLink to="/" >Bisection</NavLink></li>
          <li><NavLink to="/False_Position">False Position</NavLink></li>
          <li><NavLink to="/One_Point_interation">One Point interation</NavLink></li>
          <li><NavLink to="/Taylor_Series">Taylor Series</NavLink></li>
          <li><NavLink to="/Newton_Raphson">Newton Raphson</NavLink></li>
          <li><NavLink to="/Secant">Secant Method</NavLink></li>
          </ul>
        </NavDropdown>

        <NavDropdown title="Linear Algebra" id="nav-dropdown" fontSize="30">
        <ul>
        <li><NavLink to="/CarmerRule">CarmerRule</NavLink></li>
        </ul>
        </NavDropdown>

        <NavDropdown title="Regression" id="nav-dropdown" fontSize="30">
        <ul>
        <li><NavLink to="/LinearRegression">LinearRegression</NavLink></li>
        <li><NavLink to="/Login">Login</NavLink></li>
        </ul>
        </NavDropdown>
      
      </div>
    </div>
  </div>
</nav>

    );
}
export default Navbar