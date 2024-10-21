import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/Navmenu";

const ListaPokemones = () => {
    const [Listapokemones, setListapokemones] = useState([]);

    useEffect(() => {
        getListapokemones();
        document.title = "Lista de Pokémones";
    }, [])

    const getListapokemones = () => {
        axios.get('http://localhost:3005/Pokemones')
            .then(res => {
                setListapokemones(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3005/Pokemones/${id}`)
            .then(res => {
                console.log(res.data);
                getListapokemones();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>
                                    <h2 className="text-center">Lista de Pokémones</h2>
                                </Card.Title>
                                <Table responsive bordered hover className="text-center align-middle">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>Foto</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Nro Pokedex</th>
                                            <th>Descripción</th>
                                            <th>Estadísticas</th>
                                            <th>Habilidades</th>
                                            <th>Tipos</th>
                                            <th>Evoluciones</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Listapokemones.map(pokemon => (
                                            <tr key={pokemon.id}>
                                                <td>
                                                    <img
                                                        src={`http://localhost:3005/Pokemones/${pokemon.id}.jpg`}
                                                        alt="Foto de perfil"
                                                        width="80"
                                                        className="img-thumbnail rounded"
                                                    />
                                                </td>
                                                <td>{pokemon.id}</td>
                                                <td>{pokemon.nombre}</td>
                                                <td>{pokemon.nroPokedex}</td>
                                                <td>{pokemon.descripcion}</td>
                                                <td>
                                                    <div><strong>HP:</strong> {pokemon.hp}</div>
                                                    <div><strong>Atk:</strong> {pokemon.attack}</div>
                                                    <div><strong>Def:</strong> {pokemon.defense}</div>
                                                    <div><strong>Sp. Atk:</strong> {pokemon.spattack}</div>
                                                    <div><strong>Sp. Def:</strong> {pokemon.spdefense}</div>
                                                    <div><strong>Speed:</strong> {pokemon.speed}</div>
                                                </td>
                                                <td>
                                                    <div>{pokemon.idHabilidad1}</div>
                                                    <div>{pokemon.idHabilidad2 ? pokemon.idHabilidad2 : "N/A"}</div>
                                                    <div>{pokemon.idHabilidad3 ? pokemon.idHabilidad3 : "N/A"}</div>
                                                </td>
                                                <td>
                                                    <div>{pokemon.idTipo1}</div>
                                                    <div>{pokemon.idTipo2 ? pokemon.idTipo2 : "N/A"}</div>
                                                </td>
                                                <td>
                                                    <div><strong>Pre:</strong> {pokemon.idEvolucionPrevia ? pokemon.idEvolucionPrevia : "N/A"}</div>
                                                    <div><strong>Sig:</strong> {pokemon.idEvolucionSiguiente ? pokemon.idEvolucionSiguiente : "N/A"}</div>
                                                </td>
                                                <td>
                                                    <div className="mb-2">
                                                        <Link className="btn btn-success btn-sm" to={`/fotoPokemon/${pokemon.id}`}>Foto</Link>
                                                    </div>
                                                    <div className="mb-2">
                                                        <Link className="btn btn-primary btn-sm" to={`/Pokemon/${pokemon.id}`}>Editar</Link>
                                                    </div>
                                                    <Button variant="danger" size="sm" onClick={() => eliminar(pokemon.id)}>Eliminar</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>


        </>
    );
}

export default ListaPokemones;
