import React from 'react';

const DownloadDeliveryNote = ({ noteId }) => {
  const handleDownload = async () => {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${noteId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Error al descargar el albarán.');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `albaran_${noteId}.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al descargar el albarán.');
    }
  };

  return (
    <button onClick={handleDownload} className="bg-yellow-500 text-white p-2 rounded">
      Descargar Albarán
    </button>
  );
};

export default DownloadDeliveryNote;
