import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOneCharacter } from "../../services/apiCalls"
import { Col, Container, Row } from "react-bootstrap"

export const Detail = () => {
    const id:any = useParams().id
    const [character, setCharacter] = useState<characterData>()

    useEffect(() => {
      getOneCharacter(id)
      .then(res => setCharacter(res))
    }, [])

    interface characterData {
        name: string
        id: string
        location: {name:string}
        image: string
        status: string
    }

    
  return (
    <>
    <Container>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
        <img src={character?.image} alt="" />
        <p>{character?.name}</p>
        <p>{character?.location?.name}</p>
        <p>{character?.status}</p>
        </Col>
      </Row>
    </Container>
        
    </>
  )
}
