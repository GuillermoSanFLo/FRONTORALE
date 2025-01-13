import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function CallToAction() {
  return (
    <div className="hero-gradient text-white py-5">
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="display-4 mb-4">
                ¿Listo para comenzar tu viaje?
              </h2>
              <p className="lead mb-4">
                Únete a nuestra comunidad de desarrolladores y comienza a crecer profesionalmente.
              </p>
              <Button
                as={Link}
                to="/register"
                variant="light"
                size="lg"
                className="btn-hover-effect"
              >
                Comienza Gratis
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CallToAction;