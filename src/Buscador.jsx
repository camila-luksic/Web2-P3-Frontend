import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const FormularioBusqueda = () => {
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    const handleBuscar = (e) => {
        e.preventDefault();
        if (busqueda.trim()) {
            navigate(`/resultados-busqueda?query=${busqueda}`);
        }
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Buscar</h2>
                            </Card.Title>
                            <Form  onSubmit={handleBuscar}>
                                <Form.Group>
                                    <Form.Control
                                        required
                                        value={busqueda}
                                        type="text"
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        placeholder="Buscar Pokémon"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un nombre , tipo o nrPokedex.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Button type="submit">Buscar</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default FormularioBusqueda;