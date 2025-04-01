import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  prompt:{
    type: String,
    required: true,

  },
  tech_stack:{
    type: String,
    enum: ['Mern Stack', 'Java Spring Boot'],
    required: true,
  }
})
const Project = mongoose.model('Project', projectSchema);
export default Project;