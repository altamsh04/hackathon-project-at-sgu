import express from 'express';
import Project from "../db/project.js";

const router = express.Router();

const createProject = async (req, res) => {
  try {
    const { projectName, projectDescription, userInputButtons, members, admin } = req.body;

    if (!projectName || !projectDescription || !admin) {
      return res.status(400).json({ message: 'Project name, description, and admin are required.' });
    }

    const formattedMembers = members?.map(member => ({
      userId: member.userId,
      tasks: member.tasks || []
    })) || [];

    const newProject = new Project({
      projectName,
      projectDescription,
      userInputButtons,
      members: formattedMembers,
      admin,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const allProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

const adminProjects = async (req, res) => {
  try {
    const { projectId, adminId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    if (project.admin.toString() !== adminId) {
      return res.status(403).json({ message: 'Access denied. You are not the admin of this project.' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const projectsByMember = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Find projects where userId is in memberButtons
    const projects = await Project.find({ memberButtons: userId });

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this user.' });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects by member:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { createProject, allProjects, adminProjects, projectsByMember };

