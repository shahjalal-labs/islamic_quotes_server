import generateToken from "../../../utils/generateToken.js";

const issueToken = async (req, res) => {
  const userInfo = req.body;

  const token = generateToken(userInfo);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Successfully issued token ",
    token,
  });
};

export const AuthControllers = {
  issueToken,
};
