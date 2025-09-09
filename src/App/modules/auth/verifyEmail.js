const verifyEmail = async (req, res, next) => {
  const jwtEmail = req.decoded?.email;
  console.log(jwtEmail, "verifyEmail.js", 3);

  const clientEmail =
    req?.query?.email ||
    req?.body?.creatorEmail ||
    req?.body?.studentEmail ||
    req?.body?.email ||
    req?.body?.evaluatedBy;
  if (clientEmail !== jwtEmail) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, you are not authorized with others' cookie",
    });
  }

  next();
};

export default verifyEmail;
