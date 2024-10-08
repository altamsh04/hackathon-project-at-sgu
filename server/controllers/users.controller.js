import Auth from '../db/users.js';

const dbUsers = async (req, res) => {
  try {
    const users = await Auth.find().select('-password').exec();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {dbUsers, getUserById};
