import { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { getMentoriasByUsuario, getResenasByMentoriaId, createResena, updateResena, deleteResena } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaClock, FaUser, FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChatPage from './ChatPage';

function StudentDashboard() {
  const [mentorias, setMentorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedMentoria, setSelectedMentoria] = useState(null);
  const [reviewData, setReviewData] = useState({
    puntaje: 5,
    comentario: '',
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatHora = (hora24) => {
    const [hora, minutos] = hora24.split(":");
    const horaInt = parseInt(hora, 10);
  
    const periodo = horaInt >= 12 ? "PM" : "AM";
    const hora12 = horaInt % 12 || 12;
  
    return `${hora12}:${minutos} ${periodo}`;
  };
  const fetchMentoriasWithReviews = async () => {
    try {
      const data = await getMentoriasByUsuario(user.idUsuario);
      const mentoriasWithReviews = await Promise.all(
        data.map(async (mentoria) => {
          const reviews = await getResenasByMentoriaId(mentoria.idMentoria);
          const userReview = reviews.find(r => r.usuario.idUsuario === user.idUsuario);
          return { ...mentoria, userReview, allReviews: reviews };
        })
      );
      setMentorias(mentoriasWithReviews);
    } catch (error) {
      console.error('Error fetching mentorias:', error);
      toast.error('Error al cargar las mentorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.idUsuario) {
      fetchMentoriasWithReviews();
    }
  }, [user]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewPayload = {
        ...reviewData,
        fecha: new Date().toISOString(),
        mentoria: { idMentoria: selectedMentoria.idMentoria },
        usuario: { idUsuario: user.idUsuario }
      };

      if (selectedMentoria.userReview) {
        await updateResena(selectedMentoria.userReview.idResena, reviewPayload);
        toast.success('Reseña actualizada exitosamente');
      } else {
        await createResena(reviewPayload);
        toast.success('Reseña creada exitosamente');
      }

      setShowReviewModal(false);
      await fetchMentoriasWithReviews();
    } catch (error) {
      toast.error('Error al guardar la reseña');
    }
  };

  const handleDeleteReview = async (resenaId) => {
    try {
      await deleteResena(resenaId);
      toast.success('Reseña eliminada exitosamente');
      await fetchMentoriasWithReviews();
    } catch (error) {
      toast.error('Error al eliminar la reseña');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-warning' : 'text-muted'}
        style={{ cursor: 'pointer' }}
        onClick={() => setReviewData({ ...reviewData, puntaje: index + 1 })}
      />
    ));
  };

  return (
    <Row>
      <Col md={8}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Mis Mentorías</h3>
                <Button 
                  variant="primary" 
                  className="btn-hover-effect"
                  onClick={() => navigate('/programs')}
                >
                  Buscar Mentoría
                </Button>
              </div>
              {loading ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaStar className="text-primary" size={30} />
                  </motion.div>
                  <p>Cargando mentorías...</p>
                </div>
              ) : mentorias.length === 0 ? (
                <div className="text-center">
                  <p>No tienes mentorías activas</p>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/programs')}
                  >
                    Explorar Mentorías
                  </Button>
                </div>
              ) : (
                mentorias.map((mentoria, index) => (
                  <motion.div
                    key={mentoria.idMentoria}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="mb-3 hover-scale">
                      <Card.Body>
                        <h5>{mentoria.titulo}</h5>
                        <p className="text-muted">{mentoria.descripcion}</p>
                        
                        <div className="d-flex flex-wrap mb-3">
                          <div className="me-4">
                            <FaCalendar className="text-primary me-2" />
                            <span>{mentoria.fechaInicio} - {mentoria.fechaFin}</span>
                          </div>
                          <div className="me-4">
                            <FaClock className="text-primary me-2" />
                            <span> {formatHora(mentoria.hora)}</span>
                          </div>
                          <div>
                            <FaUser className="text-primary me-2" />
                            <span>{mentoria.mentor?.nombre}</span>
                          </div>
                        </div>

                        {mentoria.userReview ? (
                          <div className="border-top pt-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6>Tu Reseña</h6>
                                <div className="mb-2">
                                  {renderStars(mentoria.userReview.puntaje)}
                                </div>
                                <p className="mb-0">{mentoria.userReview.comentario}</p>
                              </div>
                              <div>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-2"
                                  onClick={() => {
                                    setSelectedMentoria(mentoria);
                                    setReviewData({
                                      puntaje: mentoria.userReview.puntaje,
                                      comentario: mentoria.userReview.comentario
                                    });
                                    setShowReviewModal(true);
                                  }}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDeleteReview(mentoria.userReview.idResena)}
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setSelectedMentoria(mentoria);
                              setReviewData({ puntaje: 5, comentario: '' });
                              setShowReviewModal(true);
                            }}
                          >
                            Agregar Reseña
                          </Button>
                        )}
                        
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setSelectedMentoria(mentoria)}
                        >
                          Ver Mensajes
                        </Button>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </Col>

      <Col md={4}>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-sm">
            <Card.Body>
              <h3>Mensajes</h3>
              {selectedMentoria ? (
                <ChatPage mentoria={selectedMentoria} />
              ) : (
                <p className="text-center text-muted">
                  Selecciona una mentoría para ver los mensajes
                </p>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </Col>

      {/* Modal de Reseñas */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMentoria?.userReview ? 'Editar Reseña' : 'Nueva Reseña'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <div className="mb-2">
                {renderStars(reviewData.puntaje)}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewData.comentario}
                onChange={(e) => setReviewData({ ...reviewData, comentario: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Reseña
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default StudentDashboard;