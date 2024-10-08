import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  userInputButtons: [String],
  memberButtons: [String],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
