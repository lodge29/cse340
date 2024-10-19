

/* ***************************
 *  error link for testing
 * ************************** */
const RenderErrorView = (req, res, next) => {
    const error = new Error('Intentional Server Error');
    error.status = 500;
    next(error);
  };

  
  module.exports = { RenderErrorView };