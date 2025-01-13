import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

function Testimonials() {
  const allTestimonials = [
    {
      name: 'Miguel Ángel',
      role: 'Estudiante de Frontend',
      text: 'Gracias a mi mentor pude conseguir mi primer trabajo como desarrollador.',
      image: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
    },
    {
      name: 'Sara López',
      role: 'Backend Developer',
      text: 'Las mentorías me ayudaron a mejorar mis habilidades técnicas significativamente.',
      image: 'https://img.freepik.com/free-vector/mysterious-mafia-character-smoking-cigarette_23-2148466270.jpg'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Full Stack Developer',
      text: 'La mentoría personalizada aceleró mi crecimiento profesional de manera increíble.',
      image: 'https://img.freepik.com/free-vector/young-man-avatar-character_24877-9475.jpg'
    },
    {
      name: 'Ana María Ruiz',
      role: 'UX/UI Designer',
      text: 'Encontré la guía perfecta para transicionar al mundo del diseño digital.',
      image: 'https://img.freepik.com/free-vector/young-woman-avatar-character_24877-9474.jpg'
    },
    {
      name: 'Diego Herrera',
      role: 'Mobile Developer',
      text: 'Mi mentor me ayudó a dominar React Native y ahora trabajo en proyectos internacionales.',
      image: 'https://img.freepik.com/free-vector/man-avatar-character_24877-9476.jpg'
    },
    {
      name: 'Laura Sánchez',
      role: 'Data Scientist',
      text: 'Las sesiones de mentoría me dieron la confianza para liderar proyectos de machine learning.',
      image: 'https://img.freepik.com/free-vector/woman-avatar-character_24877-9473.jpg'
    },
    {
      name: 'Roberto Jiménez',
      role: 'DevOps Engineer',
      text: 'Aprendí las mejores prácticas de CI/CD y automatización gracias a mi mentor.',
      image: 'https://img.freepik.com/free-vector/man-with-mustache-avatar-character_24877-9485.jpg'
    },
    {
      name: 'Patricia Torres',
      role: 'QA Engineer',
      text: 'La mentoría me ayudó a implementar procesos de testing más eficientes en mi empresa.',
      image: 'https://img.freepik.com/free-vector/woman-with-glasses-avatar-character_24877-9474.jpg'
    }
  ];

  // Get random testimonials
  const getRandomTestimonials = () => {
    const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const [displayedTestimonials] = React.useState(getRandomTestimonials());

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 brand-animated">Testimonios</h2>
      <Row>
        {displayedTestimonials.map((testimonial, index) => (
          <Col md={6} key={index} className="mb-4">
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-100 shadow-sm hover-scale">
                <Card.Body className="text-center">
                  <FaQuoteLeft className="display-4 text-primary mb-3" />
                  <p className="mb-4">{testimonial.text}</p>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px' }}
                  />
                  <h5 className="mb-1">{testimonial.name}</h5>
                  <p className="text-muted">{testimonial.role}</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Testimonials;