import React, { useState, useEffect } from "react";
import axios from 'axios';

const CarList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de carros:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (userId) => {
        const confirmDelete = window.confirm('¿Está seguro de que desea eliminar la publicación?');
        if (confirmDelete) {
            //logica de eliminacion, a modo demo,  mientras se consume api
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
            console.log('Eliminar carro con id: ', userId);
        }
    };

    const carImages = [
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/01%20Renault%20Stepway-01.jpg?alt=media&token=1ec06e20-326f-4c8f-bce2-0d0856db7716',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/01%20Renault%20Stepway-02.jpg?alt=media&token=410048ca-a6c5-4807-af12-091b15b44de0',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/01%20Renault%20Stepway-03.jpg?alt=media&token=5c2b8ea6-01b0-4196-9664-7240268c2284',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/01%20Renault%20Stepway-04.jpg?alt=media&token=25abc004-babf-43b2-8604-6d95312da3ea',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/01%20Renault%20Stepway-05.jpg?alt=media&token=afd910fe-d315-4577-b07c-1edd3b930356',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-02.jpg?alt=media&token=0b54a0dd-557d-438f-b8d8-4c5a77917443',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-03.jpg?alt=media&token=280f317f-0011-4aa4-b83e-a3acd54cc352',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-04.jpg?alt=media&token=7fc979df-4bfb-4ca8-9bed-d27134d1779b',
        'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/03%20Mazda%203-01.jpg?alt=media&token=3a0502c7-095c-4f81-9a9f-7fc41e5a91a1'
    ];

    return (
        <div>
            <h2>Lista de carros</h2>
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>
                                <img src={carImages[index]} style={{ width: '200px', height: 'auto' }} />
                            </td>  
                            <td>{user.name}</td>
                            <td>{user.id}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>Editar Carro</button>
                                <button onClick={() => handleDelete(user.id)}>Eliminar Carro</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;