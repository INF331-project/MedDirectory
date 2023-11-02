import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import home from '../assets/home.svg';
import '../styles/navbar.css';

export const NavBar = () => {
    return (
        <Navbar bg='light' data-bs-theme='light'>
            <Navbar.Brand href='/'>
                <img src={home} alt='logo'></img>
            </Navbar.Brand>
            <Nav>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/list'>Lista de médicos</Nav.Link>
                <Nav.Link href='/addDoctor'>Añadir médico</Nav.Link>
                <Nav.Link href='/locationSelect'>Seleccionar Clinica</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavBar;