import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/backend';
import './Usuarios.css'

interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

const Usuarios: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        setFilteredUsers(
            users.filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleCreateNew = () => {
        alert('Crear nuevo usuario');
    };

    const handleEdit = (userId: number) => {
        alert(`Editar usuario con ID: ${userId}`);
    };

    const handleDelete = (userId: number) => {
        alert(`Eliminar usuario con ID: ${userId}`);
    };

    return (
        <div className="usuarios-container">
            <div className="usuarios-header">
                <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    value={search}
                    onChange={handleSearch}
                />
                <button onClick={handleCreateNew}>Crear Nuevo</button>
            </div>

            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.createdAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>✏️</button>
                                <button onClick={() => handleDelete(user.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
