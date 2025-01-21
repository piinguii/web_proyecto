const ProjectsForm = ({formData={ name: '', description: '', clientId: '', _id: '' }, onSubmit, handleChange, clients}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input             
                required
                className="border rounded p-2 w-full mb-4"
                value={formData.name} 
                onChange={handleChange} 
                type="text" 
                name="name" 
                placeholder="Nombre del Proyecto" 
                />
                {!formData._id && (
                    <select
                    required
                    className="border rounded p-2 w-full mb-4"
                    value={formData.clientId} onChange={handleChange} 
                    type="number" 
                    name="clientId" 
                    placeholder="ID del Cliente" >
                        <option value="">Selecciona un cliente</option>
                        {clients.map((client) => (
                            <option key={client._id} value={client._id}>{client.name}</option>
                        ))}
                    </select>
                )}

                <button className="bg-blue-500 text-white p-2 rounded" type="submit">{formData._id ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    )
}

export default ProjectsForm;