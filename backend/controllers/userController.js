const User = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    const { email_user, motDePasse } = req.body;

    if (!email_user || !motDePasse) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email_user } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.motDePasse !== motDePasse) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log(`Welcome ${user.userName}! You have successfully logged in.`);

    return res.status(200).json({ 
      message: 'Login successful', 
      user: {
        id: user.id_user,
        userName: user.userName,
        email: user.email_user,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = exports;
