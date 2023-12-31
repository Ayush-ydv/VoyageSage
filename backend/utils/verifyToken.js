import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Getting token from headers
  let token = req.headers["authorization"];
  

  // Check if token exists and is in the correct format (Bearer <token>)
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).send({ result: "Please add token with header" });
  }

  // Extract the token from the header
  token = token.split(" ")[1];

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).send({ result: "Please provide valid token" });
    }
    req.user = user;
    next();
  });
}


// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return res
//       .status(401)
//       .json({
//         success: false,
//         message: "Tumse na ho payega ...You are authorize!",
//       });
//   }

  // if token is exist then verify the token
  


export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user && (req.user.id === req.params.id || req.user.role === "user")) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorize" });
    }
  });
};
