import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

    return (
      <>
        <Container>
          <Row className="justify-content-around">
          <Col>
              <div onClick={() => navigate("/")}>REACT</div>
            </Col>
            <Col>
              <div onClick={() => navigate("/login")}>LOGIN</div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
