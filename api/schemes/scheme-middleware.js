const db = require('../../data/db-config')


/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    // Explicitly convert scheme_id from string to integer
    const schemeId = parseInt(req.params.scheme_id, 10);

    // Check for invalid conversion (e.g., non-numeric string)
    if (isNaN(schemeId)) {
      return res.status(400).json({
        message: `Invalid scheme_id value: ${req.params.scheme_id}`
      });
    }

    const scheme = await db('schemes')
      .where({ scheme_id: schemeId })
      .first();

    if (!scheme) {
      return res.status(404).json({
        message: `scheme with scheme_id ${schemeId} not found`
      });
    }

    // If the scheme exists, attach it to the request object for potential use in subsequent middleware/routes
    req.scheme = scheme;
    next();
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name} = req.body
  if(scheme_name === undefined ||
    typeof scheme_name !== 'string' ||
    !scheme_name.trim()
    ) {
       next({  status: 400, message: 'invalid scheme_name'})
    }else {
      next()
    }

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    instructions === undefined ||
    typeof instructions !== 'string' ||
    !instructions.trim() ||
    typeof step_number !== 'number' ||
    step_number < 1
  ) {
    next({ status: 400, message: "invalid step" });
  } else {
    next();
  }
};



module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
