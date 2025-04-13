import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/backend';
import Formulario from '../Formulario/Formulario';
import './Productos.css';
import { MdEdit, MdDelete } from 'react-icons/md';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: string;
}

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<Product[]>([]);
    const [filtrados, setFiltrados] = useState<Product[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditando, setProductoEditando] = useState<Product | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getProducts();
                setProductos(data);
                setFiltrados(data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
        fetch();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBusqueda(valor);
        setFiltrados(productos.filter(p =>
            p.name.toLowerCase().includes(valor.toLowerCase())
        ));
    };

    const handleCreateNew = () => {
        setProductoEditando(null);
        setMostrarFormulario(true);
    };

    const handleEdit = (id: number) => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            setProductoEditando(producto);
            setMostrarFormulario(true);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmar = window.confirm('¿Seguro que quieres eliminar este producto?');
        if (!confirmar) return;

        try {
            await deleteProduct(id);
            setProductos(prev => prev.filter(p => p.id !== id));
            setFiltrados(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error al eliminar producto:', err);
        }
    };

    const handleSubmit = async (datos: any) => {
        try {
            if (productoEditando) {
                console.log('Actualizando producto:', datos);
                const actualizado = await updateProduct(productoEditando.id, datos);
                const nuevos = productos.map(p => p.id === actualizado.id ? actualizado : p);
                setProductos(nuevos);
                setFiltrados(nuevos);
            } else {
                console.log('Creando nuevo producto:', datos);
                const nuevo = await createProduct(datos);
                setProductos(prev => [...prev, nuevo]);
                setFiltrados(prev => [...prev, nuevo]);
            }
            setMostrarFormulario(false);
        } catch (err) {
            console.error('Error al guardar producto:', err);
        }
    };

    return (
        <div className="productos-container">
            <div className="productos-header">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
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
                            { nombre: 'description', tipo: 'text', label: 'Descripción' },
                            { nombre: 'price', tipo: 'number', label: 'Precio' },
                        ]}
                        modo={productoEditando ? 'editar' : 'crear'}
                        valoresIniciales={productoEditando || {}}
                        onSubmit={handleSubmit}
                        onCancel={() => setMostrarFormulario(false)}
                    />
                </>
            )}

            <table className="productos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Creado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.name}</td>
                            <td>{producto.description}</td>
                            <td>${producto.price.toFixed(2)}</td>
                            <td>{new Date(producto.createdAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleEdit(producto.id)}>
                                    <MdEdit size={20} color="blue" />
                                </button>
                                <button onClick={() => handleDelete(producto.id)}>
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

export default Productos;
