import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { createUsuario } from '../services/api';
import { FaSpinner } from 'react-icons/fa';

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'Aprendiz',
    bio: '',
    nivelExperiencia: 'Principiante',
    areasInteres: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUsuario(formData);
      toast.success('Registro exitoso');
      navigate('/login');
    } catch (error) {
      toast.error('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center mb-4 brand-animated">Registro</h2>
                </motion.div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Form.Control
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        required
                      />
                    </motion.div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </motion.div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Form.Control
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                      />
                    </motion.div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Form.Select
                        value={formData.rol}
                        onChange={(e) => setFormData({...formData, rol: e.target.value})}
                      >
                        <option value="Aprendiz">Aprendiz</option>
                        <option value="Mentor">Mentor</option>
                      </Form.Select>
                    </motion.div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Biografía</Form.Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        required
                      />
                    </motion.div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nivel de Experiencia</Form.Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Form.Select
                        value={formData.nivelExperiencia}
                        onChange={(e) => setFormData({...formData, nivelExperiencia: e.target.value})}
                      >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </Form.Select>
                    </motion.div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Áreas de Interés</Form.Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Form.Control
                        type="text"
                        value={formData.areasInteres}
                        onChange={(e) => setFormData({...formData, areasInteres: e.target.value})}
                        placeholder="Ej: React, Node.js, Python"
                        required
                      />
                    </motion.div>
                  </Form.Group>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 btn-gradient"
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <FaSpinner className="me-2" />
                        </motion.div>
                      ) : (
                        'Registrarse'
                      )}
                    </Button>
                  </motion.div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;