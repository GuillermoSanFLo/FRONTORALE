import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <div className="hero-gradient text-white py-5">
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="display-4 fw-bold mb-4">
                Potencia tu Carrera en Tecnología
              </h1>
              <p className="lead mb-4">
                Conecta con mentores expertos en programación y desarrollo.
                Aprende de profesionales y alcanza tus metas.
              </p>
              <Button
                as={Link}
                to="/register"
                variant="light"
                size="lg"
                className="me-3 btn-hover-effect"
              >
                Comienza Ahora
              </Button>
              <Button
                as={Link}
                to="/mentors"
                variant="outline-light"
                size="lg"
                className="btn-hover-effect"
              >
                Explorar Mentores
              </Button>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"
                alt="Programming Mentor"
                className="img-fluid rounded shadow-lg hover-scale"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;