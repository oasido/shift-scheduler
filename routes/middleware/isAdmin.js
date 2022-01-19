const isAdmin = (req, res, next) => {
  try {
    const { admin } = req.user;
    admin && next();
  } catch (error) {
    console.error(error);
    res.json(error.msg);
  }
};

module.exports = isAdmin;
