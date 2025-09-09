export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none", // must match the cookie set options
    partitioned: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Logout successful: cookies removed" });
};

export default logout;
