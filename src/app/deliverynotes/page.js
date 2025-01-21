// app/deliverynotes/page.js
"use client";
import React, { useState, useEffect } from 'react';
import DeliveryNoteForm from '@/components/DeliveryNotes/DeliveryNoteForm';
import DeliveryNotesList from '@/components/DeliveryNotes/DeliveryNotesList';
import { useRouter } from 'next/navigation';

const DeliveryNotes = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ description: '', projectId: '' });
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      router.push('/');
    }
    fetchDeliveryNotes();
    fetchProjects();
  }, []);

  const fetchDeliveryNotes = async () => {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Error al obtener los albaranes.');
      const data = await response.json();
      setDeliveryNotes(data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProjects = async () => {
    const token = localStorage.getItem('jwt');
    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    setProjects(data || []);
  };

  const createDeliveryNote = async (e) => {
  
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Created Note:', data); // Debug the created note
      if (!response.ok) throw new Error('Error creating delivery note');
      alert('Delivery Note created successfully');
      fetchDeliveryNotes(); // Refresh the list
    } catch (err) {
      console.error(err.message);
      alert('Error al crear el albarán.');
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
          <h2 className="text-xl font-bold pb-4">Crear Nuevo Albarán</h2>
          <DeliveryNoteForm projects={projects} formData={formData} onSubmit={createDeliveryNote} handleChange={handleChange} />
        </div>
        <div className="flex-1 flex justify-start">
          <DeliveryNotesList deliveryNotes={deliveryNotes} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotes;
