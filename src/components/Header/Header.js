import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Languages from './Languages';
import { DiReact } from 'react-icons/di'
import { useTranslation } from 'react-i18next';
import Profile from './Profile';
import { useState } from 'react';


const Header = () => {
    const [isShowModalProfile, setIsShowModalProfile] = useState(false)

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();


    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogout = async () => {
        let rs = await logout(account.email, account.refresh_token);
        if (rs && rs.EC === 0) {
            // clear data redux
            dispatch(doLogout())
            navigate('/login')
        } else {
            toast.error(rs.EM)
        }
        // console.log('check res1', rs)
    }

    const handleProfile = () => {
        setIsShowModalProfile(true)
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <NavLink to='/' className='navbar-brand'>
                        <DiReact className='brand-icon' />
                        {t('header.brand-name')}
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/' className='nav-link'>{t('header.home')}</NavLink>
                            <NavLink to='/users' className='nav-link'>{t('header.user')}</NavLink>
                            <NavLink to='/admins' className='nav-link'>{t('header.admin')}</NavLink>
                            {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/admins">Admin</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>{t('header.actions.login')} </button>
                                    <button className='btn-signup' onClick={() => handleRegister()}>{t('header.actions.signup')}</button>
                                </>
                                :
                                <NavDropdown title={t('header.actions.title')} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleProfile()} >{t('header.actions.settings.profile')}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>{t('header.actions.settings.logout')} </NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Languages />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Profile
                show={isShowModalProfile}
                setShow={setIsShowModalProfile}
            />
        </>

    );
}

export default Header;