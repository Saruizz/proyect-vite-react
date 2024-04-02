import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import imagenes from '../../assets/img';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';


const BotonesHeader = () => {
    const { decode, logout ,userData} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Suscribirse a los cambios en decode
        // Esto se ejecutará cada vez que decode cambie
        console.log('Nuevo valor de decode:', decode);
        console.log('Nuevo valor de data:',data);

        setMenuOpen(false); // Cierra el menú cuando decode cambie
    }, [decode]); // Ejecutar el efecto cuando decode cambie

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div  className='botonesHeader'>
            {!decode ? (
                <div className={menuOpen ? styles.mobileMenuOpen : ''}>
                    <div>
                        <div>
                            <div>
                                <img
                                    className={styles.mobileMenuIcon}
                                    onClick={toggleMenu}
                                    src={imagenes.menu}
                                />
                            </div>
                            {menuOpen ? (
                                <div className={styles.mobileMenu}>
                                    <Link className={styles.btn}>Crear cuenta</Link>
                                    <Link className={styles.btn}>Iniciar sesión</Link>
                                </div>
                            ) : (
                                <div className={styles.authButtons}>
                                    <Link to={'/crearCuenta'} className={styles.btn}>
                                        Crear cuenta
                                    </Link>
                                    <Link to={'/iniciarSesion'} className={styles.btn}>
                                        Iniciar sesión
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={menuOpen ? styles.mobileMenuOpen : ''}>
                    <div>
                        <div>
                        {userData ? (
                            <div className='menu-desplegable'>
                                <div className='userData'>
                                    <p>{userData.nombre} <strong>{`${userData?.nombre.charAt(0)}${userData?.apellido.charAt(0)}`}</strong></p>
                                </div>
                                <div className='chevron-down'>
                                    <i className='fa-solid fa-chevron-down' onClick={toggleMenu}></i>
                                </div>
                                
                            </div>
                        ):
                            <div className='menu-desplegable'>
                                <i className='fa-solid fa-chevron-down' onClick={toggleMenu}></i>
                            </div>
                        }
                            
                            {menuOpen && (
                                <div className={`${styles.menuPrincipal} ${userData ? styles.menuPrincipalCompleto : ''}`}>
                                    <Link className={styles.optionMenu} to={'/'}>
                                        Home
                                    </Link>
                                    <Link className={styles.optionMenu} to={'/perfil'}>
                                        Información Personal
                                    </Link>
                                    {decode.isAdmin && (
                                        <Link className={styles.optionMenu} to={'/administracion'}>
                                            Panel Administración
                                        </Link>
                                    )}
                                    <Link className={styles.optionMenu} to={'/favoritos'}>
                                        Lista de favoritos
                                    </Link>
                                    <Link className={styles.optionMenu} onClick={handleLogout} to={'/'}>
                                        Cerrar Sesión
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default BotonesHeader;
