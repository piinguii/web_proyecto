import Link from 'next/link';

const ClientsList = ({clients}) => {
    return (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold pb-4">Lista de Clientes</h2>
        <ul className="flex flex-col gap-4">
          {clients.map((client) => (
           <Link href={`/client/${client._id}`} key={client._id} className="border rounded p-2 w-full mb-4 hover:bg-gray-100">
            {client.name} - {client.cif} - {client.address.city}
           </Link>
          ))}
        </ul>
        </div>
    )
}

export default ClientsList;