import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormHabilidad = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getHabilidadById();
        }
    }, [id]);

    const getHabilidadById = () => {
        axios.get(`http://localhost:3005/Habilidades/${id}`)
            .then(res => {
                const tipo = res.data;
                setNombre(tipo.nombre);
            }).catch(error => {
                console.log(error);
            });
    };

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const habilidad = { nombre };

        if (id) {
            editHabilidad(habilidad);
        } else {
            insertHabilidad(habilidad);
        }
    };

    const editHabilidad = (habilidad) => {
        axios.put(`http://localhost:3005/Habilidades/${id}`, habilidad)
            .then(res => {
                console.log(res.data);
                navigate('/habilidad');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertHabilidad = (habilidad) => {
        axios.post('http://localhost:3005/Habilidades',habilidad)
            .then(res => {
                console.log(res.data);
                navigate('/habilidad');
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Formulario Habilidades</h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                <Form.Group>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        required
                                        value={nombre}
                                        type="text"
                                        onChange={onChangeNombre}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un nombre.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Button type="submit">Guardar datos</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FormHabilidad;
