const user = await User.findById(userId);
if (newPassword) {
    console.log("Before hashing:", newPassword);
    user.password = await bcrypt.hash(newPassword, 10);
    console.log("After hashing:", user.password);
    await user.save();
}