import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const PopularMentors = () => {
  const allMentors = [
    {
      name: 'Ana García',
      specialty: 'Frontend Development',
      image: 'https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg',
      skills: ['React', 'Vue', 'Angular']
    },
    {
      name: 'Carlos Ruiz',
      specialty: 'Backend Development',
      image: 'https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg',
      skills: ['Node.js', 'Python', 'Java']
    },
    {
      name: 'Laura Martínez',
      specialty: 'Full Stack Development',
      image: 'https://img.freepik.com/free-vector/female-programmer-concept-illustration_114360-3913.jpg',
      skills: ['MERN Stack', 'DevOps', 'AWS']
    },
    {
      name: 'Miguel Ángel López',
      specialty: 'Mobile Development',
      image: 'https://img.freepik.com/free-vector/mobile-development-concept-illustration_114360-3823.jpg',
      skills: ['React Native', 'Flutter', 'iOS']
    },
    {
      name: 'Sofia Morales',
      specialty: 'UI/UX Design',
      image: 'https://img.freepik.com/free-vector/ux-ui-designer-concept-illustration_114360-4384.jpg',
      skills: ['Figma', 'Adobe XD', 'Sketch']
    },
    {
      name: 'Diego Fernández',
      specialty: 'DevOps Engineer',
      image: 'https://img.freepik.com/free-vector/devops-concept-illustration_114360-4372.jpg',
      skills: ['Docker', 'Kubernetes', 'Jenkins']
    },
    {
      name: 'Isabel Torres',
      specialty: 'Data Science',
      image: 'https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-4248.jpg',
      skills: ['Python', 'R', 'TensorFlow']
    },
    {
      name: 'Ricardo Vargas',
      specialty: 'Cybersecurity',
      image: 'https://img.freepik.com/free-vector/cyber-security-concept-illustration_114360-4432.jpg',
      skills: ['Pentesting', 'Network Security', 'Cryptography']
    },
    {
      name: 'Carmen Ortiz',
      specialty: 'Cloud Architecture',
      image: 'https://img.freepik.com/free-vector/cloud-computing-concept-illustration_114360-4294.jpg',
      skills: ['AWS', 'Azure', 'GCP']
    },
    {
      name: 'Pablo Sánchez',
      specialty: 'Blockchain Development',
      image: 'https://img.freepik.com/free-vector/blockchain-concept-illustration_114360-4398.jpg',
      skills: ['Solidity', 'Web3.js', 'Smart Contracts']
    },
    {
      name: 'Elena Ramírez',
      specialty: 'Quality Assurance',
      image: 'https://img.freepik.com/free-vector/qa-engineers-concept-illustration_114360-4414.jpg',
      skills: ['Selenium', 'Jest', 'Cypress']
    },
    {
      name: 'Jorge Mendoza',
      specialty: 'Game Development',
      image: 'https://img.freepik.com/free-vector/game-development-concept-illustration_114360-4447.jpg',
      skills: ['Unity', 'Unreal Engine', 'C++']
    },
    {
      name: 'María José Díaz',
      specialty: 'AI/ML Engineering',
      image: 'https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-4358.jpg',
      skills: ['PyTorch', 'Scikit-learn', 'OpenCV']
    }
  ];

  // Get 3 random mentors
  const getRandomMentors = () => {
    const shuffled = [...allMentors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [displayedMentors] = useState(getRandomMentors());

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Mentores Destacados</h2>
      <Row>
        {displayedMentors.map((mentor, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100 shadow hover-scale">
              <Card.Img variant="top" src={mentor.image} className="p-3" />
              <Card.Body>
                <Card.Title>{mentor.name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  {mentor.specialty}
                </Card.Subtitle>
                <div>
                  {mentor.skills.map((skill, idx) => (
                    <Badge 
                      bg="primary" 
                      className="me-2 mb-2" 
                      key={idx}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularMentors;