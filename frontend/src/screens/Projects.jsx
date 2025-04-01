import React, { useEffect, useState } from "react";
import axios from "../config/axios.js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios.js";

function Projects() {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState(""); 
  const [techStack, setTechStack] = useState("");

  const [project, setProject] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!showNewProjectForm) {
      axios
        .get('/project/all')
        .then((res) => {
          console.log("Fetched projects:", res.data);
          setProject(res.data.projects);
        })
        .catch((err) => {
          console.log("Error fetching projects:", err);
        });
    }
  }, [showNewProjectForm]);

  const handleNewProjectClick = () => {
    setShowNewProjectForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "prompt") {
      setPrompt(value);
    } else if (name === "techStack") {
      setTechStack(value);
    }
  };

  const handleCreateProject = () => {
    axios.post('/project/create', { 
      name, 
      prompt, 
      tech_stack: techStack 
    })
    .then((res) => {
      console.log("Project created:", res.data);

      setProject(res.data.projects);
      setName('');
      setPrompt('');
      setTechStack('');

      setShowNewProjectForm(false);

      navigate('/projects');
    })
    .catch((err) => {
      console.error("Error creating project:", err.response?.data || err.message);
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center">
            Meet AI Project Generator, the first AI software engineer
          </h1>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Previous projects</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNewProjectClick}
          >
            + New Project
          </button>
        </div>

        {showNewProjectForm && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Create New Project</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Project Name:
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Project Prompt:
              </label>
              <textarea
                name="prompt"
                value={prompt}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Tech Stack:
              </label>
              <select
                name="techStack"
                value={techStack}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Tech Stack</option>
                <option value="Java Spring Boot">Java Spring Boot</option>
                <option value="Mern Stack">Mern Stack</option>
              </select>
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreateProject}
            >
              Create Project
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(project) && project.map((proj) => (
            <div key={proj?._id} onClick={() => { navigate(`/project`, {
              state: { proj }
            }) }} className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{proj?.name || "Untitled Project"}</h3>
              <p className="text-gray-400 mb-4">{proj?.prompt || "No description available"}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {proj?.tech_stack || "Unknown Tech Stack"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
