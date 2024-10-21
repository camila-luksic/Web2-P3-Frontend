import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";

const DetallePokemon = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [habilidades, setHabilidades] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [lineaEvolutiva, setLineaEvolutiva] = useState([]);

    const calcularStat = (base, iv, ev, nivel) =>
        Math.floor(((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100) + nivel + 10;

    useEffect(() => {
        axios
            .get(`http://localhost:3005/Pokemones/${id}`)
            .then((res) => {
                setPokemon(res.data);
                return Promise.all([
                    axios.get(`http://localhost:3005/Habilidades/${res.data.idHabilidad1}`),
                    res.data.idHabilidad2 ? axios.get(`http://localhost:3005/Habilidades/${res.data.idHabilidad2}`) : null,
                    res.data.idHabilidad3 ? axios.get(`http://localhost:3005/Habilidades/${res.data.idHabilidad3}`) : null,
                    axios.get(`http://localhost:3005/Tipos/${res.data.idTipo1}`),
                    res.data.idTipo2 ? axios.get(`http://localhost:3005/Tipos/${res.data.idTipo2}`) : null,
                    axios.get(`http://localhost:3005/Pokemones/${id}/linea-evolutiva`)
                ]);
            })
            .then((responses) => {
                const habilidadesData = responses.slice(0, 3).map(response => response ? response.data.nombre : "N/A");
                setHabilidades(habilidadesData);

                const tiposData = responses.slice(3, 5).map(response => response ? response.data.nombre : "N/A");
                setTipos(tiposData);

                setLineaEvolutiva(responses[5].data || []);
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (!pokemon) return <div>Cargando...</div>;

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col xs={12}>
                    <Card className="p-4 shadow" style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                        <Row>
                            <Col xs={12} md={6} className="mb-4">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3005/Pokemones/${pokemon.id}.jpg`}
                                    alt={pokemon.nombre}
                                    className="img-fluid"
                                    style={{ height: "500px", objectFit: "cover", borderRadius: "15px" }}
                                />
                            </Col>

                            <Col xs={12} md={6}>
                                <h2>{pokemon.nombre}</h2>
                                <p><strong>Nro Pokédex:</strong> {pokemon.nroPokedex}</p>
                                <p><strong>Descripción:</strong> {pokemon.descripcion}</p>
                                <p><strong>Nivel Evolución:</strong> {pokemon.nivelEvolucion}</p>

                                <Table striped bordered hover className="mt-3">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Base</th>
                                            <th>Mínimo</th>
                                            <th>Máximo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {["hp", "attack", "defense", "spattack", "spdefense", "speed"].map((stat) => (
                                            <tr key={stat}>
                                                <td>{stat.toUpperCase()}</td>
                                                <td>{pokemon[stat]}</td>
                                                <td>{calcularStat(pokemon[stat], 0, 0, 100)}</td>
                                                <td>{calcularStat(pokemon[stat], 31, 252, 100)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <p><strong>Habilidades:</strong> {habilidades.join(", ")}</p>
                                <p><strong>Tipos:</strong> {tipos.join(", ")}</p>

                                <h5>Línea Evolutiva:</h5>
                                <Row className="d-flex flex-row">
                                    {lineaEvolutiva.map((poke) => (
                                        <Col key={poke.id} xs={4} md={2} className="text-center">
                                            <img
                                                src={`http://localhost:3005/Pokemones/${poke.id}.jpg`}
                                                alt={poke.nombre}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    margin: "0 15px 25px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    border: "2px solid #ddd"
                                                }}
                                            />
                                            <p style={{ marginTop: "15px", fontSize: "12px" }}>{poke.nombre}</p>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DetallePokemon;
