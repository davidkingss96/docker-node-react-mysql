import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from '../../services/backend';
import Formulario from '../Formulario/Formulario'; // Asegúrate que esta ruta es correcta
import './Usuarios.css';

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
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
        setMostrarFormulario(true);
    };

    const handleEdit = (userId: number) => {
        alert(`Editar usuario con ID: ${userId}`);
    };

    const handleDelete = (userId: number) => {
        alert(`Eliminar usuario con ID: ${userId}`);
    };

    const handleSubmit = async (datos: any) => {
        try {
            const nuevo = await createUser(datos);
            setUsers((prev) => [...prev, nuevo]);
            setFilteredUsers((prev) => [...prev, nuevo]);
            setMostrarFormulario(false);
        } catch (err) {
            console.error('Error al crear usuario:', err);
        }
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

            {/* Mostrar el modal */}
            {mostrarFormulario && (
                <>
                    <div className="formulario-overlay" onClick={() => setMostrarFormulario(false)}></div> {/* Fondo oscuro */}
                    <Formulario
                        campos={[
                            { nombre: 'name', tipo: 'text', label: 'Nombre' },
                            { nombre: 'email', tipo: 'email', label: 'Email' },
                        ]}
                        modo="crear"
                        onSubmit={handleSubmit}
                        onCancel={() => setMostrarFormulario(false)}
                    />
                </>
            )}

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
