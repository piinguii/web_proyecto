const ClientsForm = ({formData, onSubmit, handleChange}) => {
    return (
        <div>
             <form
             className="flex flex-col gap-4"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="text"
            name="cif"
            placeholder="CIF"
            value={formData.cif}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="text"
            name="street"
            placeholder="Calle"
            value={formData.street}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="number"
            name="number"
            placeholder="Número"
            value={formData.number}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="number"
            name="postal"
            placeholder="Código Postal"
            value={formData.postal}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="text"
            name="province"
            placeholder="Provincia"
            value={formData.province}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            { formData._id ? 'Actualizar Cliente' : 'Crear Cliente'}
          </button>
        </form>
        </div>
    )
}

export default ClientsForm;