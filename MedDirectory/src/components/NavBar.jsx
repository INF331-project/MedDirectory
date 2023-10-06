import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import home from '../assets/home.svg';


function NavBar() {
    return (
        <>
            <Navbar bg='light' data-bs-theme='light'>
                <Container>
                    <Navbar.Brand href='/'>
                        <img src={home} alt='logo'></img>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/list'>Lista de médicos</Nav.Link>
                        <Nav.Link href='/addDoctor'>Añadir médico</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;