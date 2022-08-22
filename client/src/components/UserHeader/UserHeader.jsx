import React from "react";
import { Navbar, Container ,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function UserHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('usertoken')
    navigate('/',{replace:true})
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Button onClick={() => logout()} variant="primary">Log out</Button>
        </Container>
      </Navbar>
    </div>
  );
}

export default UserHeader;
