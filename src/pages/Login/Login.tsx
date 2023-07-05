import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { logUser } from "../../services/apiCalls";
import './Login.css'
import { TextInput } from "../../common/TextInput/TextInput";

export const Login = () => {

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    email: "",
    password: "",
    credentials: ""
  });


  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logUser(userCredentials).then((res) => {
      sessionStorage.setItem("token", res.token);
    })
    .catch(error => {
        setUserError((prevState) => ({
        ...prevState,
        credentials: error.response.data.message
    }))});
  };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col
            xs={10}
            md={6}
            lg={4}
          >
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                {userError.credentials ? (<div>{userError.credentials}</div>) : (<div></div>)}

                <Form.Label>Email address</Form.Label>
                <TextInput
                type="email"
                placeholder="Enter email"
                name="email"
                design={userError.email ? ('errorInput') : ("")}
                state={setUserCredentials}
                errorState={setUserError}
                password1=""
                />
            
                {userError.email ? (<div>{userError.email}</div>) : (<div></div>)}
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <TextInput
                type="password"
                placeholder="Enter password"
                name="password"
                design={userError.password ? ('errorInput') : ("")}
                state={setUserCredentials}
                errorState={setUserError}
                password1=""
                />
              
                {userError.password ? (<div>{userError.password}</div>) : (<div></div>)}

              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  type="checkbox"
                  label="Check me out"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => submitHandler(e)}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
