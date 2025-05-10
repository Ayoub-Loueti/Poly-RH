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

    if (user.isValid !== 1) {
      return res.status(403).json({ message: 'User is blocked or inactive' });
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

exports.blockUser = async (req, res) => {
  try {
    const { id_user } = req.body;
    if (!id_user) {
      return res.status(400).json({ message: 'User id is required' });
    }
    const user = await User.findByPk(id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isValid = user.isValid === 1 ? 0 : 1;
    await user.save();
    return res.status(200).json({
      message: `User isValid status changed to ${user.isValid}`,
      user: {
        id: user.id_user,
        email: user.email_user,
        role: user.role,
        isValid: user.isValid
      }
    });
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    return res.status(500).json({ message: 'Server error while toggling user status' });
  }
};

module.exports = exports;
