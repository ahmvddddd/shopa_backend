const User = require('../../models/user');

exports.getUserInfo = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const user = await User.findOne({ _id: currentUserId });

        if (user) {
            res.status(200).json({
                userId: user.userId,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                admin: user.admin,
                category: user.category,
                service: user.service,
                bio: user.bio,
                skills: user.skills
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get user details by username
exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select(
            '-password'
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const users = await User.find({ _id: { $ne: currentUserId } }).select(
            'firstname lastname username _id email category bio service skills'
        );

        // const users = await User.find({ _id: { $ne: currentUserId } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
