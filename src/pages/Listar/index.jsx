import { useEffect, useState } from "react";
import api from '../../Services/api';

function ListarUsuarios() {
    const [AllUsers, setAllUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const token = localStorage.getItem('token');
            try {
                const { data: { users } } = await api.get('/listar-cliente', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setAllUsers(users);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        }

        loadUsers();
    }, []);

    return (
        <div>
            <h2>Listar Usuários</h2>
            <ul>
                {AllUsers.map((user) => (
                    <li key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>Nome: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListarUsuarios;
