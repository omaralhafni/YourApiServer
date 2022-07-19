import jsonwebtoken from "jsonwebtoken";

const generateWebToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export default generateWebToken;
