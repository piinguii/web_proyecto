"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ClientsForm from "@/components/Clients/ClientsForm";
const ClientPage = () => {
    const [clientData, setClientData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        if(id){
            fetchClientById(id);
        }
    }, [id]);

    const fetchClientById = async (id) => {
        const token = localStorage.getItem('jwt');
        try {
          const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${id}`, {
            method: 'GET',
            
            headers: { 'Authorization': `Bearer ${token}` },
          });
    
          if (!response.ok) {
            throw new Error('Error al obtener el cliente.');
          }
    
          const clientData = await response.json();
          setClientData(clientData);
          console.log(clientData);
        } catch (error) {
          console.error(error);
          setError('Hubo un problema al obtener el cliente.');
        }
      };
    
    
    const updateClient = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('jwt');
        const response =  fetch(`https://bildy-rpmaya.koyeb.app/api/client/${id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(clientData),
        }).then(response => {
          if(response.ok){
            fetchClientById(id);
          }
        })
    }
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name in clientData.address) {
        setClientData({ 
          ...clientData, 
          address: { 
            ...clientData.address, 
            [name]: value 
          } 
        });
      } else {
        setClientData({ ...clientData, [name]: value });
      }
    };
    
     if (clientData) return  (
     <div className="container mx-auto p-6">
       <ClientsForm formData={{ ...clientData, ...clientData.address }} onSubmit={updateClient} handleChange={handleChange} />
     </div>
     )
}

export default ClientPage;
