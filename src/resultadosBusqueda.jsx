// ResultadosBusqueda.jsx
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useLocation ,Link} from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ResultadosBusqueda = () => {
    const [resultados, setResultados] = useState([]);
    const location = useLocation();
    
    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        console.log("***"+query);
        if (query) {
            buscarPokemones(query);
        }
    }, [location]);

    const buscarPokemones = (query) => {
        axios.get(`http://localhost:3005/Pokemones/buscar?q=${query}`)
            .then(res => {
                setResultados(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <h2 className="text-center mb-4">Resultados de Búsqueda</h2>
                {resultados.map(pokemon => (
                    <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Img
                                variant="top"
                                src={`http://localhost:3005/Pokemones/${pokemon.id}.jpg`}
                                alt={pokemon.nombre}
                                className="img-fluid"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body>
                            <Card.Title className="text-center">
                                        <Link to={`/Pokemones/${pokemon.id}`} className="text-decoration-none">
                                            {pokemon.nombre}
                                        </Link>
                                    </Card.Title>
                                <Card.Text className="text-center">
                                    <strong>Nro Pokédex:</strong> {pokemon.nroPokedex}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ResultadosBusqueda;
