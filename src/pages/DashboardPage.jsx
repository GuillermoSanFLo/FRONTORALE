import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import StudentDashboard from '../components/StudentDashboard';
import MentorDashboard from '../components/MentorDashboard';

function DashboardPage() {
  const { user } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container fluid className="py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h2 className="brand-animated">
                  Bienvenido, {user.nombre}
                </h2>
                <p className="text-muted">
                  {user.rol === 'Aprendiz' ? 'Panel de Estudiante' : 'Panel de Mentor'}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {user.rol === 'Aprendiz' ? (
          <StudentDashboard />
        ) : (
          <MentorDashboard />
        )}
      </motion.div>
    </Container>
  );
}

export default DashboardPage;