import React from 'react';

const DeliveryNoteForm = ({ deliveryNote, projects = [], onSubmit, method = 'POST' }) => {
  const [formData, setFormData] = React.useState({
    clientId: deliveryNote?.clientId || '',
    projectId: deliveryNote?.projectId || '',
    material: deliveryNote?.material || '',
    hours: deliveryNote?.hours || '',
    workdate: deliveryNote?.workdate || '',
    description: deliveryNote?.description || '',
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'projectId') {
      // Find the selected project's clientId
      const selectedProject = projects.find((project) => project._id === value);
      setFormData((prev) => ({
        ...prev,
        projectId: value,
        clientId: selectedProject ? selectedProject.clientId : '', // Update clientId from project
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.clientId) newErrors.clientId = 'Client is required';
    if (!formData.projectId) newErrors.projectId = 'Project is required';
    if (!formData.workdate) newErrors.workdate = 'Work date is required';
    if (!formData.description) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Project Selection */}
        <div>
          <label htmlFor="projectId" className="block text-sm font-medium mb-2">
            Project
          </label>
          <select
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="border rounded p-2 w-full mb-4"
          >
            <option value="">Select project</option>
            {Array.isArray(projects) &&
              projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
          </select>
          {errors.projectId && (
            <p className="text-sm text-red-500">{errors.projectId}</p>
          )}
        </div>

        {/* Client Display (Read-Only) */}
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium mb-2">
            Client
          </label>
          <input
            id="clientId"
            name="clientId"
            type="text"
            value={formData.clientId}
            readOnly
            className="border rounded p-2 w-full mb-4 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Material Input */}
        <div>
          <label htmlFor="material" className="block text-sm font-medium mb-2">
            Material Type
          </label>
          <input
            id="material"
            name="material"
            type="text"
            value={formData.material}
            onChange={handleChange}
            className="border rounded p-2 w-full mb-4"
          />
        </div>

        {/* Hours Input */}
        <div>
          <label htmlFor="hours" className="block text-sm font-medium mb-2">
            Hours
          </label>
          <input
            id="hours"
            name="hours"
            type="number"
            value={formData.hours}
            onChange={handleChange}
            className="border rounded p-2 w-full mb-4"
          />
        </div>

        {/* Work Date Input */}
        <div>
          <label htmlFor="workdate" className="block text-sm font-medium mb-2">
            Work Date
          </label>
          <input
            id="workdate"
            name="workdate"
            type="date"
            value={formData.workdate}
            onChange={handleChange}
            className="border rounded p-2 w-full mb-4"
          />
          {errors.workdate && (
            <p className="text-sm text-red-500">{errors.workdate}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border rounded p-2 w-full mb-4"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          {method === 'POST' ? 'Create Delivery Note' : 'Update Delivery Note'}
        </button>
      </form>
    </div>
  );
};

export default DeliveryNoteForm;
