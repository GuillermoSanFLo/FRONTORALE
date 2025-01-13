import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllMentorias, getAllResenas, inscribirAprendiz } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { FaCalendar, FaClock, FaUser, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ProgramsPage() {
  const [mentorias, setMentorias] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [selectedMentoriaResenas, setSelectedMentoriaResenas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inscripciones, setInscripciones] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorias = async () => {
      try {
        const data = await getAllMentorias();
        const dataResenas = await getAllResenas();
        setMentorias(data);
        
        console.log(mentorias);
        setResenas(dataResenas);
        
        
        if (user) {
          // Filtrar las mentorías donde el usuario está inscrito (buscando el idUsuario dentro de las mentorías)
          const inscripcionesUsuario = data.filter(mentoria => 
            mentoria.aprendiz?.idUsuario === user.idUsuario
          );
          setInscripciones(inscripcionesUsuario.map(m => m.idMentoria));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchMentorias();
  }, [user]);

  const handleMentoriaClick = (mentoriaId) => {
    const filteredResenas = resenas.filter(resena => resena.mentoria.idMentoria === mentoriaId);
    setSelectedMentoriaResenas(filteredResenas);
    setModalVisible(true);
  };

  const handleInscription = async (mentoriaId) => {
    if (!user) {
      toast.info('Por favor inicia sesión para inscribirte');
      navigate('/login');
      return;
    }

    if (inscripciones.includes(mentoriaId)) {
      toast.info('Ya estás inscrito en esta mentoría');
      return;
    }

    try {
      await inscribirAprendiz(mentoriaId, user.idUsuario);
      toast.success('¡Inscripción exitosa!');
      setInscripciones([...inscripciones, mentoriaId]);
      
      // Animación de salida antes de navegar
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Error en la inscripción:', error);
      toast.error('Error al realizar la inscripción');
    }
  };
  const formatHora = (hora24) => {
    const [hora, minutos] = hora24.split(":");
    const horaInt = parseInt(hora, 10);
  
    const periodo = horaInt >= 12 ? "PM" : "AM";
    const hora12 = horaInt % 12 || 12;
  
    return `${hora12}:${minutos} ${periodo}`;
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
          Programas de Mentoría
        </h1>
        <p className="text-center section-subtitle">
          Explora nuestros programas personalizados y encuentra el mentor perfecto para tu desarrollo profesional
        </p>

        <Row className="justify-content-center g-4">
          {mentorias.map((mentoria, index) => (
            <Col md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Card
                  className="feature-card h-100 shadow-sm"
                  onClick={() => handleMentoriaClick(mentoria.idMentoria)}
                >
                  <Card.Body>
                    <h3 className="mb-3">{mentoria.titulo}</h3>
                    <p className="text-muted">{mentoria.descripcion}</p>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaCalendar className="text-primary me-2" />
                        <span>Duración: {mentoria.fechaInicio} hasta {mentoria.fechaFin}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaClock className="text-primary me-2" />
                        <span>Horario: {formatHora(mentoria.hora)}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaUser className="text-primary me-2" />
                        <span>
                          Mentor: {mentoria.mentor?.nombre || "Información no disponible"}
                        </span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <Badge
                          bg={mentoria.status === 'Activa' ? 'success' : 'secondary'}
                          className="status-badge me-2"
                        >
                          {mentoria.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      {mentoria.tecnologias?.map((tech, idx) => (
                        <Badge
                          bg="primary"
                          className="me-2 mb-2"
                          key={idx}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={inscripciones.includes(mentoria.idMentoria) ? "success" : "gradient"}
                        className={`w-100 ${inscripciones.includes(mentoria.idMentoria) ? 'btn-success' : 'btn-gradient'}`}
                        disabled={mentoria.status === 'Finalizado' || inscripciones.includes(mentoria.idMentoria)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInscription(mentoria.idMentoria);
                        }}
                      >
                        {mentoria.status === 'Finalizado'
                          ? 'Inscripción cerrada'
                          : inscripciones.includes(mentoria.idMentoria)
                          ? 'Inscrito'
                          : user
                          ? 'Inscribirse'
                          : 'Iniciar sesión para inscribirse'}
                      </Button>
                    </motion.div>
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
              Opiniones de los estudiantes
            </motion.h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMentoriaResenas.length > 0 ? (
            selectedMentoriaResenas.map((resena, index) => (
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
                <p className="text-muted">{resena.comentario}</p>
              </motion.div>
            ))
          ) : (
            <p>No hay reseñas disponibles para esta mentoría.</p>
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

export default ProgramsPage;