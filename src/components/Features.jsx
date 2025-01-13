import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLaptopCode, FaUsers, FaClock, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Features() {
  const features = [
    {
      icon: <FaLaptopCode />,
      title: 'Aprendizaje Práctico',
      description: 'Sesiones uno a uno con expertos en tecnología'
    },
    {
      icon: <FaUsers />,
      title: 'Comunidad Activa',
      description: 'Conecta con otros estudiantes y mentores'
    },
    {
      icon: <FaClock />,
      title: 'Horarios Flexibles',
      description: 'Programa sesiones según tu disponibilidad'
    },
    {
      icon: <FaStar />,
      title: 'Mentores Verificados',
      description: 'Profesionales con experiencia comprobada'
    }
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 brand-animated">¿Por qué elegirnos?</h2>
      <Row>
        {features.map((feature, index) => (
          <Col md={3} sm={6} key={index} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-100 feature-card text-center">
                <Card.Body>
                  <div className="display-4 text-primary mb-3 icon-bounce">
                    {feature.icon}
                  </div>
                  <h4>{feature.title}</h4>
                  <p className="text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Features;