import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand="lg" className="navbar-dark py-3" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
      <Container>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Navbar.Brand as={Link} to="/" className="brand-animated">
            MentorConnect
          </Navbar.Brand>
        </motion.div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="brand-animated">
              MentorConnect
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="text-white">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/mentors" style={{ color: 'black' }}>Mentores</Nav.Link>
<Nav.Link as={Link} to="/programs" style={{ color: 'black' }}>Programas</Nav.Link>
<Nav.Link as={Link} to="/about" style={{ color: 'black' }}>Acerca de</Nav.Link>
              {user && (
                <Nav.Link 
                  as={Link} 
                  to={user.rol === 'Aprendiz' ? '/dashboard' : '/dashboard'} 
                  style={{ color: 'black' }}
                >
                  Dashboard
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {user ? (
                <>
                  <span className="text-white me-3 d-flex align-items-center">
                    {user.nombre}
                  </span>
                  <Button
                    variant="outline-light"
                    className="btn-gradient"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-light"
                    className="me-2 btn-gradient"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    className="btn-gradient"
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;