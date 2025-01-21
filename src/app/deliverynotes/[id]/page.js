// app/deliverynotes/page.js
"use client";
import React, { useState, useEffect } from 'react';
import DeliveryNotesList from '@/components/DeliveryNotes/DeliveryNotesList';
import { useRouter } from 'next/navigation';

const DeliveryNotes = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [error, setError] = useState('');
  const [company, setCompany] = useState(false);
  const [signed, setSigned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      router.push('/');
    }
    fetchDeliveryNotes();
  }, [company, signed]);

  const fetchDeliveryNotes = async () => {
    const token = localStorage.getItem('jwt');
    const query = new URLSearchParams({ company, signed }).toString();
    try {
      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote?${query}`, {
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

  return (
    <div className="container mx-auto p-6">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold pb-4">Lista de Albaranes</h2>
          <DeliveryNotesList deliveryNotes={deliveryNotes} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotes;
