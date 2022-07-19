
export function getUserObject(user, values = {}) {
    return {
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        dateOfBirth: user.dateOfBirth,
        isAdmin: user.isAdmin,
        ...values,
    };
}

export const helperUpdateUser = (data, user) => {

    const email = data?.email?.toLowerCase();

    const {
        userName,
        firstName,
        lastName,
        password,
        profileImage,
        dateOfBirth,
    } = data

    user.userName = userName || user.userName;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    password && (user.password = password);
    user.profileImage = profileImage || user.profileImage;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    return user;
}