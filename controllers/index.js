// Home page control
const getHomePage = (req, res) => {
  res.render('index', { 
    title: 'Reading List App',
    user: req.user
  });
};

module.exports = {
  getHomePage
};