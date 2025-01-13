import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaRocket, FaHeart, FaUsers, FaLightbulb } from 'react-icons/fa';

function AboutPage() {
  const values = [
    {
      icon: <FaRocket />,
      title: 'Innovación',
      description: 'Impulsamos el crecimiento tecnológico a través de métodos modernos de enseñanza.'
    },
    {
      icon: <FaHeart />,
      title: 'Pasión',
      description: 'Amamos lo que hacemos y transmitimos ese entusiasmo a nuestra comunidad.'
    },
    {
      icon: <FaUsers />,
      title: 'Comunidad',
      description: 'Creamos espacios de aprendizaje colaborativo y apoyo mutuo.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Excelencia',
      description: 'Nos esforzamos por mantener los más altos estándares de calidad en mentoría.'
    }
  ];

  return (
    <Container fluid className="py-5 full-width-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="content-section hero-gradient text-white">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <motion.h1
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="section-title mb-4"
                >
                  Nuestra Misión
                </motion.h1>
                <motion.p
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="lead mb-0"
                >
                  Conectar a profesionales apasionados por la tecnología con estudiantes 
                  motivados, creando un ecosistema de aprendizaje que impulse el 
                  crecimiento profesional y personal.
                </motion.p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="content-section bg-light">
          <Container>
            <h2 className="section-title brand-animated">Nuestros Valores</h2>
            <Row className="g-4">
              {values.map((value, index) => (
                <Col md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="feature-card text-center h-100">
                      <Card.Body>
                        <div className="display-4 text-primary mb-3">
                          {value.icon}
                        </div>
                        <h3 className="h4 mb-3">{value.title}</h3>
                        <p className="text-muted mb-0">{value.description}</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="content-section section-gradient text-white">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <motion.div
                  initial={{ x: -30 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="mb-4">¿Por qué elegirnos?</h2>
                  <p className="lead">
                    Ofrecemos una plataforma única donde el aprendizaje se combina 
                    con la experiencia práctica. Nuestros mentores son profesionales 
                    activos en la industria que comparten no solo conocimiento técnico, 
                    sino también insights valiosos del mundo real.
                  </p>
                </motion.div>
              </Col>
              <Col md={6}>
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src="https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg"
                  alt="Teaching Concept"
                  className="img-fluid rounded shadow-lg"
                />
              </Col>
            </Row>
          </Container>
        </section>
      </motion.div>
    </Container>
  );
}

export default AboutPage;