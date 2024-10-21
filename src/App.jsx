import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/Navmenu";
import "./App.css";
const PokemonesView = () => {
    const [Listapokemones, setListapokemones] = useState([]);

    useEffect(() => {
        getListapokemones();
        document.title = "Pokémones - Vista";
    }, []);

    const getListapokemones = () => {
        axios.get('http://localhost:3005/Pokemones')
            .then(res => {

                console.log(res.data);
                const pokemonesOrdenados = res.data.sort((a, b) => a.nroPokedex - b.nroPokedex);
                setListapokemones(pokemonesOrdenados);
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    {Listapokemones.map(pokemon => (
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
                                    <Card.Text className="text-center">
                                        <strong>#</strong> {pokemon.nroPokedex}
                                    </Card.Text>
                                    <Card.Title className="text-center">
                                        <Link to={`/Pokemones/${pokemon.id}`} className="text-decoration-none">
                                            {pokemon.nombre}
                                        </Link>
                                    </Card.Title>



                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default PokemonesView;
