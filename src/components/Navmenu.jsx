import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './NavMenu.css';

const NavMenu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="nav-container">
      <Container>
        <Navbar.Brand as={Link} to="/">POKEDEX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <NavDropdown title="Pokemones" id="dropdown-tipos">
              <NavDropdown.Item as={Link} to="/pokemon">Ver Pokemones</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createPokemon">Crear Pokemones</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Tipos" id="dropdown-tipos">
              <NavDropdown.Item as={Link} to="/tipo">Ver Tipos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createTipo">Crear Tipo</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Habilidades" id="dropdown-habilidades">
              <NavDropdown.Item as={Link} to="/habilidad">Ver Habilidades</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createHabilidad">Crear Habilidad</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link as={Link} to="/buscar/">Buscar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
