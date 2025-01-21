import Link from 'next/link';
const ProjectsList = ({projects}) => {
    return (
        <div>
            <h2 className="text-xl font-bold pb-4">Lista de Proyectos</h2>
           <div className="flex flex-col gap-4">
           {projects.map((project) => (
                <Link href={`/projects/${project._id}`} key={project._id} className="border rounded p-2 w-full mb-4 hover:bg-gray-100">
                    {project.name} - {project.description} - {project.clientId}
                </Link>
            ))}
           </div>
        </div>
    )
}

export default ProjectsList;