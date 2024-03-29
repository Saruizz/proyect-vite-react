import React,{useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import img from '../../../../../../assets/img';
import styles from './Perfil.module.css'; // Importar los estilos
import { AuthContext } from '../../../../../../AuthContext';
import { getToken }  from '../../../../../token/tokenService'
import axios from 'axios';


const Perfil = () => {
    const { decode, updateUserData } = useContext(AuthContext);
    const location = useLocation();
    const { state } = location || {};
    const user = state && state.user;
    // const { decode } = useAuth();
    const [userData, setUserData] = useState(null);
    // const [userData, setUserData] = useState(null);

    const token = getToken(); console.log(token);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Tipo de contenido del cuerpo
                };
                const response = await axios.post('http://localhost:8081/usuarios/correoElectronico',
                {
                    correoElectronico: decode.email,
                },
                {
                headers,
                }
                );

                setUserData(response.data);
                updateUserData(response.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        }
        fetchData()
    }, [])
                
  

    return (
        <div className={styles.perfil}>
            <h1 className={styles.titulo}>Información personal</h1>
            <div className={styles.userPerfil}>
                <div>
                    <img src={img.isoLogoA2} width={200} alt='Logo' />
                </div>
                <div className={styles.informacion}>
                    {userData && (
                        <>
                            <div className={styles.nombre}>
                                <span>
                                    <h3>Nombre</h3>
                                    <p>{userData[0].nombre}</p>
                                </span>
                                <span>
                                    <h3>Apellido</h3>
                                    <p>{userData[0].apellido}</p>
                                </span>
                            </div>
                            <div>
                                <h3>Correo electrónico</h3>
                                <p className={styles.p}>{userData[0].correoElectronico}</p>
                            </div>
                            <div>
                                <h3>Contraseña</h3>
                                <p className={styles.p}>********</p>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <img src={img.isoLogoA2} width={200} alt='Logo' />
                </div>
            </div>
        </div>
    );
};

export default Perfil;