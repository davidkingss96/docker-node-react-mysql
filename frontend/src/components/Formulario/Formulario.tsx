import React, { useState } from 'react';
import './Formulario.css';

interface Campo {
    nombre: string;
    tipo: string;
    label: string;
}

interface FormularioProps {
    campos: Campo[];
    modo: 'crear' | 'editar';  // Puede ser crear o editar
    onSubmit: (datos: any) => Promise<void>;
    onCancel: () => void;
}

const Formulario: React.FC<FormularioProps> = ({ campos, modo, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<any>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="formulario">
            <h2>{modo === 'crear' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}</h2>
            <form onSubmit={handleSubmit}>
                {campos.map((campo) => (
                    <div key={campo.nombre}>
                        <label htmlFor={campo.nombre}>{campo.label}</label>
                        <input
                            id={campo.nombre}
                            name={campo.nombre}
                            type={campo.tipo}
                            value={formData[campo.nombre] || ''}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default Formulario;
