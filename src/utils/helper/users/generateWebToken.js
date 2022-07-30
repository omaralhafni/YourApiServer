import jsonwebtoken from "jsonwebtoken";

const generateWebToken = (user) => {
  return jsonwebtoken.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export default generateWebToken;
