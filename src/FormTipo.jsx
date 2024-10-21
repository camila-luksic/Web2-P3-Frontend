import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormTipo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getTipoById();
        }
    }, [id]);

    const getTipoById = () => {
        axios.get(`http://localhost:3005/Tipos/${id}`)
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

        const tipo = { nombre };

        if (id) {
            editTipo(tipo);
        } else {
            insertTipo(tipo);
        }
    };

    const editTipo = (tipo) => {
        axios.put(`http://localhost:3005/Tipos/${id}`, tipo)
            .then(res => {
                console.log(res.data);
                navigate('/tipo');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertTipo = (tipo) => {
        axios.post('http://localhost:3005/Tipos', tipo)
            .then(res => {
                console.log(res.data);
                navigate('/tipo');
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
                                <h2>Formulario Tipos</h2>
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

export default FormTipo;
