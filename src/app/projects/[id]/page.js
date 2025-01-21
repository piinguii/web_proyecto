
"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProjectsForm from '@/components/Projects/ProjectsForm';

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        setProject(data);
    };

    const updateProject = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
        const data = await response.json();
        fetchProject();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setProject({ ...project, [name]: value });
    };

    if(project) return (
        <div>
            <h1>Proyecto</h1>
            <ProjectsForm clients={[]} formData={project} onSubmit={updateProject} handleChange={handleChange} />
        </div>
    )
}

export default Project;