// Projects.js
"use client";
import React, { useState, useEffect } from 'react';
import ProjectsForm from '@/components/Projects/ProjectsForm';
import ProjectsList from '@/components/Projects/ProjectsList';
import { useRouter } from 'next/navigation';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '' });
  const router = useRouter();
  useEffect(() => {
    if(!localStorage.getItem('jwt')){
      router.push('/');
    }
    fetchProjects();
    fetchClients();
  }, []);

const fetchProjects = async () => {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Error al obtener proyectos.');
      const data = await response.json();
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchClients = async () => {
    const token = localStorage.getItem('jwt');
    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    setClients(data || []);
  };


const createProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Error al crear el proyecto.');
      alert('Proyecto creado exitosamente.');
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

const updateProject = async (projectId) => {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${projectId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Error al actualizar el proyecto.');
      alert('Proyecto actualizado exitosamente.');
      fetchProjects();
    } catch (err) {
      setError(err.message);
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
  <h2 className="text-xl font-bold pb-4">Crear Nuevo Proyecto</h2>
    <ProjectsForm clients={clients} formData={formData} onSubmit={createProject} handleChange={handleChange} />
  </div>
  <div className="flex-1 flex justify-start">
    <ProjectsList projects={projects} />
  </div>
 </div>
</div>  );
};

export default Projects;
