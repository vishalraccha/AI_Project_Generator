import * as projectService from '../services/project.service.js';
import projectModel from '../models/project.model.js';
import userModel from '../models/user.model.js';
import {validationResult} from 'express-validator';

export const createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const {name,prompt,tech_stack}=req.body
        const newProject=await projectService.createProject({
            name,
            prompt,
            tech_stack
        })
        res.status(201).json(newProject)
    }catch(error){
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getAllProjects=async (req,res)=>{
    try{

        if (!req.user || !req.user.email) {
            return res.status(400).json({ error: "User not authenticated" });
        }
        const loggedInUser=await userModel.findOne({
            email:req.user.email
        })

        const allProjects = await projectService.getAllProjects();

        return res.status(200).json({ projects: allProjects });
    }catch(error){
        console.error("Error fetching projects:", error);
        res.status(400).json({error:error.message})
    }
}

export const getProjectById=async (req,res)=>{
    const {projectId}=req.params
    try{
        const project=await projectService.getProjectById(projectId)
    return res.status(200).json({project})
    }catch(error){
        console.error("Error fetching project:", error);
        res.status(400).json({error:error.message})
    }
}