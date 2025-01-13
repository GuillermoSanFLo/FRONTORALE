import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { getAllMentorias, crearMentoria, updateMentoria, deleteMentoria } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { FaCalendar, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChatPage from './ChatPage';

function MentorDashboard() {
  const [mentorias, setMentorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMentoriaModal, setShowMentoriaModal] = useState(false);
  const [selectedMentoria, setSelectedMentoria] = useState(null);
  const { user } = useAuth();

  const [mentoriaData, setMentoriaData] = useState({
    fechaInicio: '',
    fechaFin: '',
    status: 'Activa',
    titulo: '',
    descripcion: '',
    hora: '',
    mentor: { idUsuario: user?.idUsuario }
  });

  const fetchMentorias = async () => {
    try {
      const data = await getAllMentorias();
      const mentoriasFiltradas = data.filter(mentoria => 
        mentoria.mentor?.idUsuario === user?.idUsuario
      );
      setMentorias(mentoriasFiltradas);
    } catch (error) {
      console.error('Error fetching mentorias:', error);
      toast.error('Error al cargar las mentorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.idUsuario) {
      fetchMentorias();
    }
  }, [user]);

  const handleMentoriaSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMentoria) {
        await updateMentoria(selectedMentoria.idMentoria, mentoriaData);
        toast.success('Mentoría actualizada exitosamente');
      } else {
        await crearMentoria(mentoriaData);
        toast.success('Mentoría creada exitosamente');
      }
      setShowMentoriaModal(false);
      fetchMentorias();
    } catch (error) {
      toast.error(selectedMentoria ? 
        'Error al actualizar la mentoría' : 
        'Error al crear la mentoría'
      );
    }
  };

  const handleDeleteMentoria = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta mentoría?')) {
      try {
        await deleteMentoria(id);
        toast.success('Mentoría eliminada exitosamente');
        fetchMentorias();
      } catch (error) {
        toast.error('Error al eliminar la mentoría');
      }
    }
  };

  const handleEdit = (mentoria) => {
    setSelectedMentoria(mentoria);
    setMentoriaData({
      fechaInicio: mentoria.fechaInicio,
      fechaFin: mentoria.fechaFin,
      status: mentoria.status,
      titulo: mentoria.titulo,
      descripcion: mentoria.descripcion,
      hora: mentoria.hora,
      mentor: { idUsuario: user?.idUsuario }
    });
    setShowMentoriaModal(true);
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
                  onClick={() => {
                    setSelectedMentoria(null);
                    setMentoriaData({
                      fechaInicio: '',
                      fechaFin: '',
                      status: 'Activa',
                      titulo: '',
                      descripcion: '',
                      hora: '',
                      mentor: { idUsuario: user?.idUsuario }
                    });
                    setShowMentoriaModal(true);
                  }}
                >
                  Crear Mentoría
                </Button>
              </div>
              {loading ? (
                <div className="text-center">
                  <p>Cargando mentorías...</p>
                </div>
              ) : mentorias.length === 0 ? (
                <div className="text-center">
                  <p>No tienes mentorías creadas</p>
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
                        <div className="d-flex justify-content-between">
                          <h5>{mentoria.titulo}</h5>
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(mentoria)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteMentoria(mentoria.idMentoria)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted">{mentoria.descripcion}</p>
                        
                        <div className="d-flex flex-wrap mb-3">
                          <div className="me-4">
                            <FaCalendar className="text-primary me-2" />
                            <span>{mentoria.fechaInicio} - {mentoria.fechaFin}</span>
                          </div>
                          <div className="me-4">
                            <FaClock className="text-primary me-2" />
                            <span>{mentoria.hora}</span>
                          </div>
                          <Badge 
                            bg={mentoria.status === 'Activa' ? 'success' : 'secondary'}
                            className="ms-2"
                          >
                            {mentoria.status}
                          </Badge>
                        </div>
                        
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
              {mentorias.length > 0 ? (
                <>
                  <Form.Select 
                    className="mb-3"
                    onChange={(e) => setSelectedMentoria(mentorias.find(m => m.idMentoria === parseInt(e.target.value)))}
                  >
                    <option value="">Selecciona una mentoría</option>
                    {mentorias.map((mentoria) => (
                      <option key={mentoria.idMentoria} value={mentoria.idMentoria}>
                        {mentoria.titulo} - {mentoria.aprendiz?.nombre}
                      </option>
                    ))}
                  </Form.Select>
                  {selectedMentoria ? (
                    <ChatPage mentoria={selectedMentoria} />
                  ) : (
                    <p className="text-center text-muted">
                      Selecciona una mentoría para ver los mensajes
                    </p>
                  )}
                </>
              ) : (
                <p className="text-center text-muted">
                  No hay mentorías activas
                </p>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </Col>

      {/* Modal de Mentoría */}
      <Modal show={showMentoriaModal} onHide={() => setShowMentoriaModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMentoria ? 'Editar Mentoría' : 'Nueva Mentoría'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleMentoriaSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={mentoriaData.titulo}
                onChange={(e) => setMentoriaData({ ...mentoriaData, titulo: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={mentoriaData.descripcion}
                onChange={(e) => setMentoriaData({ ...mentoriaData, descripcion: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Inicio</Form.Label>
              <Form.Control
                type="date"
                value={mentoriaData.fechaInicio}
                onChange={(e) => setMentoriaData({ ...mentoriaData, fechaInicio: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Fin</Form.Label>
              <Form.Control
                type="date"
                value={mentoriaData.fechaFin}
                onChange={(e) => setMentoriaData({ ...mentoriaData, fechaFin: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={mentoriaData.hora}
                onChange={(e) => setMentoriaData({ ...mentoriaData, hora: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={mentoriaData.status}
                onChange={(e) => setMentoriaData({ ...mentoriaData, status: e.target.value })}
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedMentoria ? 'Actualizar' : 'Crear'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default MentorDashboard;