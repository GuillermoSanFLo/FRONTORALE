import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Modal, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { getUsuariosByRol, getAllResenas } from '../services/api';
import { FaUser, FaStar, FaGraduationCap, FaCode } from 'react-icons/fa';
import { toast } from 'react-toastify';

function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [selectedMentorResenas, setSelectedMentorResenas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorsData, resenasData] = await Promise.all([
          getUsuariosByRol('Mentor'),
          getAllResenas()
        ]);
        setMentors(mentorsData);
        setResenas(resenasData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMentorClick = (mentorId) => {
    const filteredResenas = resenas.filter(resena => 
      resena.mentoria.mentor.idUsuario === mentorId
    );
    setSelectedMentorResenas(filteredResenas);
    setModalVisible(true);
  };

  const renderStars = (puntaje) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`me-1 ${index < puntaje ? 'text-warning' : 'text-muted'}`}
        size={18}
      />
    ));
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-5 full-width-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-center section-title brand-animated mb-5">
          Nuestros Mentores
        </h1>
        <p className="text-center section-subtitle">
          Conoce a nuestros expertos mentores y sus áreas de especialización
        </p>

        <Row className="justify-content-center g-4">
          {mentors.map((mentor, index) => (
            <Col md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className="feature-card h-100 shadow-sm"
                  onClick={() => handleMentorClick(mentor.idUsuario)}
                >
                  <Card.Body>
                    <h3 className="mb-3">{mentor.nombre}</h3>
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaUser className="text-primary me-2" />
                        <span>{mentor.email}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaGraduationCap className="text-primary me-2" />
                        <span>Nivel: {mentor.nivelExperiencia}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaCode className="text-primary me-2" />
                        <span>Áreas: {mentor.areasInteres}</span>
                      </div>
                    </div>

                    <p className="text-muted">{mentor.bio}</p>

                    <Badge bg="primary" className="me-2">
                      {mentor.rol}
                    </Badge>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>

      <Modal show={modalVisible} onHide={() => setModalVisible(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            <motion.h4
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Reseñas del Mentor
            </motion.h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMentorResenas.length > 0 ? (
            selectedMentorResenas.map((resena, index) => (
              <motion.div
                key={index}
                className="mb-4 shadow-sm p-3 rounded bg-light"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h5 className="mb-1">{resena.usuario.nombre}</h5>
                <div className="d-flex align-items-center mb-2">
                  {renderStars(resena.puntaje)}
                </div>
                <p className="text-muted mb-2">Mentoría: {resena.mentoria.titulo}</p>
                <p className="text-muted">{resena.comentario}</p>
                <small className="text-muted">
                  {new Date(resena.fecha).toLocaleDateString()}
                </small>
              </motion.div>
            ))
          ) : (
            <p className="text-center">Este mentor aún no tiene reseñas.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MentorsPage;