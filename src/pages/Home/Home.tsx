import { ChangeEvent, useEffect, useState } from "react";
import { getCharacterByName, getCharacters } from "../../services/apiCalls";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

export const Home = () => {
  interface CharData {
    id: string;
    name: string;
    image: string;
    location: { name: string };
  }
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<CharData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 1000);

  // useEffect(() => {
  //   getCharacters().then((res) => setCharacters(res));
  // }, []);

  // useEffect(()=>{
  //   if(search){
  //     getCharacterByName(search).then((res) =>
  //       setCharacters(res)
  //     );
  //   } else {
  //     getCharacters().then((res) => setCharacters(res));
  //   }
  // }, [search])

  useEffect(() => {
    if (debouncedSearch) {
      getCharacterByName(debouncedSearch).then((res) =>
        setCharacters(res)
      );
    } else {
      getCharacters().then((res) => setCharacters(res));
    }
  }, [debouncedSearch]);

  const inputHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value }: any = target;
    setSearch(value);
  };

  // const searchHandler = () => {
  //   if (search) {
  //     getCharacterByName(search).then((res) =>
  //       setCharacters(res)
  //     );
  //   } else {
  //     getCharacters().then((res) => setCharacters(res));
  //   }
  // };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={10} md={6}>
          <input
            name="criteria"
            type="text"
            placeholder="Search a character"
            onChange={inputHandler}
          />
          {/* <button onClick={searchHandler}>SEARCH</button> */}
          </Col>
        </Row>

        <Row className="justify-content-center">
          {characters?.map((char: CharData) => {
            return (
              <Col className="d-flex justify-content-center" xs={10} md={4} xl={3} key={char.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={char.image}
                  />
                  <Card.Body>
                    <Card.Title> {char.name}</Card.Title>
                    <Card.Text>{char.location.name}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/detail/${char.id}`)}
                    >
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
