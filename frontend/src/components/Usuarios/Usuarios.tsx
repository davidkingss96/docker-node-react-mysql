import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser } from '../../services/backend';
import Formulario from '../Formulario/Formulario';
import './Usuarios.css';
import { MdEdit, MdDelete } from "react-icons/md";

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
    const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null);

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
        setUsuarioEditando(null);
        setMostrarFormulario(true);
    };

    const handleEdit = (userId: number) => {
        const user = users.find((u) => u.id === userId);
        if (user) {
            setUsuarioEditando(user);
            setMostrarFormulario(true);
        }
    };

    const handleDelete = (userId: number) => {
        alert(`Eliminar usuario con ID: ${userId}`);
    };

    const handleSubmit = async (datos: any) => {
        try {
            if (usuarioEditando) {
                const actualizado = await updateUser(usuarioEditando.id, datos);
                const nuevos = users.map(u => u.id === actualizado.id ? actualizado : u);
                setUsers(nuevos);
                setFilteredUsers(nuevos);
            } else {
                const nuevo = await createUser(datos);
                setUsers(prev => [...prev, nuevo]);
                setFilteredUsers(prev => [...prev, nuevo]);
            }
            setMostrarFormulario(false);
        } catch (err) {
            console.error('Error al guardar usuario:', err);
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

            {mostrarFormulario && (
                <>
                    <div className="formulario-overlay" onClick={() => setMostrarFormulario(false)}></div>
                    <Formulario
                        campos={[
                            { nombre: 'name', tipo: 'text', label: 'Nombre' },
                            { nombre: 'email', tipo: 'email', label: 'Email' },
                        ]}
                        modo={usuarioEditando ? 'editar' : 'crear'}
                        valoresIniciales={usuarioEditando || {}}
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
                                <button onClick={() => handleEdit(user.id)}>
                                    <MdEdit size={20} color="blue" />
                                </button>
                                <button onClick={() => handleDelete(user.id)}>
                                    <MdDelete size={20} color="red" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
