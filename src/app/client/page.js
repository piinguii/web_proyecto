"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect  } from 'react';
import ClientsList from '@/components/Clients/ClientsList';
import ClientsForm from '@/components/Clients/ClientsForm';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');

  // Estados para los datos del nuevo cliente
  //const [name, setName] = useState('');
  //const [cif, setCif] = useState('');
  //const [street, setStreet] = useState('');
  //const [number, setNumber] = useState('');
  //const [postal, setPostal] = useState('');
  //const [city, setCity] = useState('');
  //const [province, setProvince] = useState('');
  const router = useRouter();
  
  useEffect(()=>{
    if (!localStorage.getItem('jwt')) {
      router.push("/");
    }else{
      fetchClients();
    }
  },[]);

  // Estados para los datos del nuevo cliente
  
  const [formData, setFormData] = useState({
    name: '',
    cif: '',
    street: '',
    number: '',
    postal: '',
    city: '',
    province: '',
  });

    const createClient = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('jwt');
      const clientData = {
        name: formData.name, // Ensure this is a string
        cif: formData.cif, // Ensure this is a string
        address: {
            street: formData.street, // Ensure this is a string
            number: Number(formData.number), // Ensure this is a number
            postal: Number(formData.postal), // Ensure this is a number
            city: formData.city, // Ensure this is a string
            province: formData.province, // Ensure this is a string
        },
    };
  
    console.log('Client Data:', clientData); // Log the client data being sent
      try {
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(clientData),
        });
        const data = await response.json(); // Obtener la respuesta en formato JSON
        localStorage.setItem('_id', data._id); // Guardar el _id en localStorage
        alert('Cliente creado exitosamente.');
        fetchClients(); // Actualizar la lista de clientes
       
      } catch (error) {
        console.error(error);
        setError('Hubo un problema al crear el cliente.');
      }
    };


    const fetchClients = async () => {
      
      const token = localStorage.getItem('jwt');
      try {
        const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener clientes.');
        }
  
        const data = await response.json();
        setClients(data || []); // Establecer la lista de clientes
      } catch (error) {
        console.error(error);
        setError('Hubo un problema al cargar los clientes.');
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <div className="container mx-auto p-6">
          {error && <p style={{ color: 'red' }}>{error}</p>}
       <div className="flex flex-row gap-4">
        <div className="flex-1">
        <h2 className="text-xl font-bold pb-4">Crear Nuevo Cliente</h2>
          <ClientsForm formData={formData} onSubmit={createClient} handleChange={handleChange} />
        </div>
        <div className="flex-1 flex justify-start">
          <ClientsList clients={clients} />
        </div>
       </div>
      </div>
    );
  };
  








export default Client;