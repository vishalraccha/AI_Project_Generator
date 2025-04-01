import projectModel from '../models/project.model.js';

export const createProject=async({
    name,
    prompt,
    tech_stack
})=>{
    if(!name || !prompt || !tech_stack){
        throw new Error('Please provide all required fields')
    }

    const project=await projectModel.create({
        name,
        prompt,
        tech_stack
    })
    return project
}

export const getAllProjects=async()=>{
    const projects = await projectModel.find({});
    return projects;
}

export const getProjectById=async(projectId)=>{
    if(!projectId){
        throw new Error('Please provide a projectId')
    }
    const project=await projectModel.findOne({_id:projectId})
    return project
}