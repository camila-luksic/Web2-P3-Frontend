import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [nroPokedex, setNroPokedex] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [habilidadList, setHabilidadList] = useState([]);
    const [habilidades, setHabilidades] = useState([]);

    const [tipoList, setTipoList] = useState([]);
    const [tipos, setTipos] = useState([]);

    const [spdefense, setSpdefense] = useState('');
    const [nivelEvolucion, setnNivelEvolucion] = useState('');

    const [pokemonList, setPokemonList] = useState([]);
    const [idEvolucionPrevia, setIdEvolucionPrevia] = useState('');
    const [idEvolucionSiguiente, setIdEvolucionSiguiente] = useState('');

    const [spattack, setSpattack] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [hp, setHp] = useState('');

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getPokemonById();
        }
    }, [id]);

    useEffect(() => {
        getListaHabilidades();
    }, [])

    useEffect(() => {
        getListaTipos();
    }, [])


    useEffect(() => {
        getListaPokemones();
    }, [])

    const getListaPokemones = () => {
        axios.get('http://localhost:3005/Pokemones')
            .then(res => {
                setPokemonList(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getListaTipos = () => {
        axios.get('http://localhost:3005/Tipos')
            .then(res => {
                setTipoList(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getListaHabilidades = () => {
        axios.get('http://localhost:3005/Habilidades')
            .then(res => {
                setHabilidadList(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getPokemonById = () => {
        axios.get(`http://localhost:3005/Pokemones/${id}`)
            .then(res => {
                const pokemon = res.data;
                setNombre(pokemon.nombre);
                setNroPokedex(pokemon.nroPokedex);
                setDescripcion(pokemon.descripcion);
                setHabilidades(pokemon.habilidades)
                setTipos(pokemon.tipos);
                setAttack(pokemon.attack);
                setDefense(pokemon.defense);
                setHp(pokemon.hp);
                setIdEvolucionPrevia(pokemon.idEvolucionPrevia);
                setIdEvolucionSiguiente(pokemon.idEvolucionSiguiente);
                setnNivelEvolucion(pokemon.nivelEvolucion);
                setSpdefense(pokemon.spdefense);
                setSpattack(pokemon.spattack);
                setSpeed(pokemon.speed);
            }).catch(error => {
                console.log(error);
            });
    };

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };
    const onChangeNrPokedex = (e) => {
        setNroPokedex(e.target.value);
    };

    const onChangeDescripcion = (e) => {
        setDescripcion(e.target.value);
    };


    const onChangeAttack = (e) => {
        setAttack(e.target.value);
    };

    const onChangeDefense = (e) => {
        setDefense(e.target.value);
    };

    const onChangeHp = (e) => {
        setHp(e.target.value);
    };

    const onChangeSpDefense = (e) => {
        setSpdefense(e.target.value);
    };

    const onChangeSpAttack = (e) => {
        setSpattack(e.target.value);
    };

    const onChangeSpeed = (e) => {
        setSpeed(e.target.value);
    };

    const onChangeNivelEvolucion = (e) => {
        setnNivelEvolucion(e.target.value);
    };


    const onGuardarClick = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const pokemon = {
            nombre,
            nroPokedex,
            descripcion,
            defense,
            speed,
            spdefense,
            attack,
            nivelEvolucion:nivelEvolucion || null,
            idEvolucionPrevia: idEvolucionPrevia || null,
            idEvolucionSiguiente: idEvolucionSiguiente || null,
            habilidades,
            tipos,
            hp,
            spattack
        };

        if (id) {
            editPokemon(pokemon);
        } else {
            insertPokemon(pokemon);
        }
    };

    const editPokemon = (pokemon) => {
        axios.put(`http://localhost:3005/Pokemones/${id}`, pokemon)
            .then(res => {
                console.log(res.data);
                navigate('/pokemon');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertPokemon = (pokemon) => {
        axios.post('http://localhost:3005/Pokemones', pokemon)
            .then(res => {
                const newPokemonId = res.data.id;
                console.log(res.data);
                navigate(`/fotoPokemon/${newPokemonId}`);
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
                                <h2>Formulario Pokemones</h2>
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

                                <Form.Group>
                                    <Form.Label>Nro Pokedex:</Form.Label>
                                    <Form.Control
                                        required
                                        value={nroPokedex}
                                        type="number"
                                        onChange={onChangeNrPokedex}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un nrPokedex.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Descripcion:</Form.Label>
                                    <Form.Control
                                        required
                                        value={descripcion}
                                        type="text"
                                        onChange={onChangeDescripcion}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese una descripcion.
                                    </Form.Control.Feedback>

                                </Form.Group>


                                <Form.Group>
                                    <Form.Label>Habilidades:</Form.Label>
                                    <Form.Select
                                        multiple
                                        value={habilidades}
                                        onChange={(e) => setHabilidades([...e.target.selectedOptions].map(option => option.value))}
                                    >
                                        {habilidadList.map(habilidad =>
                                            <option key={"Habilidad-" + habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                        )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione entre 1 y 3 habilidades.
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Label>Tipos:</Form.Label>
                                    <Form.Select
                                        multiple
                                        value={tipos}
                                        onChange={(e) => setTipos([...e.target.selectedOptions].map(option => option.value))}
                                    >
                                        {tipoList.map(tipo =>
                                            <option key={"Tipo-" + tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                        )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione entre 1 y 2 tipos.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Label>Hp:</Form.Label>
                                <Form.Control
                                    required
                                    value={hp}
                                    type="number"
                                    onChange={onChangeHp}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un valor hp.
                                </Form.Control.Feedback>

                                <Form.Label>Defense:</Form.Label>
                                <Form.Control
                                    required
                                    value={defense}
                                    type="number"
                                    onChange={onChangeDefense}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un valor defense .
                                </Form.Control.Feedback>


                                <Form.Label>Attack:</Form.Label>
                                <Form.Control
                                    required
                                    value={attack}
                                    type="number"
                                    onChange={onChangeAttack}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un valor attack .
                                </Form.Control.Feedback>


                                <Form.Label>Speed:</Form.Label>
                                <Form.Control
                                    required
                                    value={speed}
                                    type="number"
                                    onChange={onChangeSpeed}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un valor speed .
                                </Form.Control.Feedback>


                                <Form.Label>SpDefense:</Form.Label>
                                <Form.Control
                                    required
                                    value={spdefense}
                                    type="number"
                                    onChange={onChangeSpDefense}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un valor spDefense .
                                </Form.Control.Feedback>


                                <Form.Label>SpAttack:</Form.Label>
                                <Form.Control
                                    required
                                    value={spattack}
                                    type="number"
                                    onChange={onChangeSpAttack}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un valor spattack .
                                </Form.Control.Feedback>

                                <Form.Group>
                                    <Form.Label>Nivel Evolucion:</Form.Label>
                                    <Form.Control
                                        value={nivelEvolucion}
                                        type="text"
                                        onChange={onChangeNivelEvolucion}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Evolución Previa:</Form.Label>
                                    <Form.Select value={idEvolucionPrevia} onChange={(e) => {
                                        setIdEvolucionPrevia(e.target.value);
                                    }}>
                                        <option value="">Sin evolución previa</option> { }
                                        {pokemonList.map(pokemon =>
                                            <option key={"Pokemon-" + pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Evolución Siguiente:</Form.Label>
                                    <Form.Select value={idEvolucionSiguiente} onChange={(e) => {
                                        setIdEvolucionSiguiente(e.target.value);
                                    }}>
                                        <option value="">Sin evolución siguiente</option> { }
                                        {pokemonList.map(pokemon =>
                                            <option key={"Pokemon-" + pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Button type="submit">Guardar datos</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default FormPokemon;
