import { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { getConversacionByMentoriaId } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

function ChatPage({ mentoria, onClose }) {
  const [messages, setMessages] = useState([]);
  const [localMessages, setLocalMessages] = useState(() => {
    // Recuperar mensajes locales del localStorage al iniciar
    const stored = localStorage.getItem(`chat_${mentoria.idMentoria}`);
    return stored ? JSON.parse(stored) : [];
  });
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const data = await getConversacionByMentoriaId(mentoria.idMentoria);
      setMessages(data.sort((a, b) => a.idMensaje - b.idMensaje));
    } catch (error) {
      toast.error('Error al cargar los mensajes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [mentoria.idMentoria]);

  // Guardar mensajes locales en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(`chat_${mentoria.idMentoria}`, JSON.stringify(localMessages));
  }, [localMessages, mentoria.idMentoria]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, localMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      idMensaje: `local_${Date.now()}`,
      contenido: newMessage,
      fechaEnvio: new Date().toISOString(),
      mentoria: {
        idMentoria: mentoria.idMentoria
      },
      idUsuario: user.idUsuario,
      usuarioRemitente: user.nombre || 'Usuario',
      isPending: true
    };

    setLocalMessages(prev => [...prev, messageData]);
    setNewMessage('');
    
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setLocalMessages(prev => 
        prev.map(msg => 
          msg.idMensaje === messageData.idMensaje 
            ? { ...msg, isPending: false } 
            : msg
        )
      );
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const allMessages = [...messages, ...localMessages];

  const isCurrentUser = (message) => {
    const messageUserId = message.usuario?.idUsuario || message.idUsuario;
    return messageUserId === user.idUsuario;
  };

  return (
    <Card className="chat-container h-100 border-0 shadow-sm">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">Chat de Mentoría</h5>
          <small>{mentoria.titulo}</small>
        </div>
        {onClose && (
          <Button variant="link" className="text-white" onClick={onClose}>
            ×
          </Button>
        )}
      </Card.Header>
      <Card.Body className="chat-messages p-3" style={{ height: '400px', overflowY: 'auto' }}>
        {loading ? (
          <div className="text-center py-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FaSpinner className="text-primary" size={30} />
            </motion.div>
            <p>Cargando mensajes...</p>
          </div>
        ) : (
          <AnimatePresence>
            {allMessages.map((message) => (
              <motion.div
                key={message.idMensaje}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-3 d-flex ${isCurrentUser(message) ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`message-bubble p-3 rounded-3 ${
                    isCurrentUser(message) ? 'bg-primary text-white' : 'bg-light'
                  }`}
                  style={{ maxWidth: '75%', opacity: message.isPending ? 0.7 : 1 }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Badge bg={isCurrentUser(message) ? 'light' : 'primary'} 
                           className={isCurrentUser(message) ? 'text-primary' : 'text-white'}>
                      {message.usuarioRemitente}
                      {message.isPending && ' (Pendiente)'}
                    </Badge>
                  </div>
                  <p className="mb-1">{message.contenido}</p>
                  <small className={isCurrentUser(message) ? 'text-white-50' : 'text-muted'}>
                    {formatDate(message.fechaEnvio)}
                  </small>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        )}
      </Card.Body>
      <Card.Footer className="bg-white border-top-0 p-3">
        <Form onSubmit={handleSendMessage}>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              disabled={sending}
            />
            <Button 
              type="submit" 
              variant="primary"
              disabled={sending || !newMessage.trim()}
              className="d-flex align-items-center gap-2"
            >
              {sending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner />
                </motion.div>
              ) : (
                <FaPaperPlane />
              )}
            </Button>
          </div>
        </Form>
      </Card.Footer>
    </Card>
  );
}

export default ChatPage;