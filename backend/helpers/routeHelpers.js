const Joi = require("joi");

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req["params"][name] }, schema);
      if (result.error) {
        //Error Happened
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};

        if (!req.value["params"]) req.value["params"] = {};
        req.value["params"][name] = result.value.param;
        next();
      }
    };
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};

        if (!req.value["body"]) req.value["body"] = {};

        req.value["body"] = result.value;
        next();
      }
    };
  },

  schemas: {
    userSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),

    contactUsSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      subject: Joi.string().required(),
      userMessage: Joi.string().required(),
    }),

    userPhoneNumberSchema: Joi.object().keys({
      number: Joi.string().required(),
    }),

    userLogInSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),

    userRequestPasswordResetLink: Joi.object().keys({
      email: Joi.string().email().required(),
    }),

    resetPassword: Joi.object().keys({
      password: Joi.string().required(),
    }),

    verifyUserSchema: Joi.object().keys({
      secretToken: Joi.string().required(),
    }),

    userOptionalSchema: Joi.object().keys({
      name: Joi.string().required()
    }),

    updateUserImage: Joi.object().keys({
      picture: Joi.string(),
    }),

    carPaymentSchema: Joi.object().keys({
      paymentMessage: Joi.string().required(),
      carName: Joi.string().required(),
      payer: Joi.string(),
      paymentPackage: Joi.object().keys({
        packageName: Joi.string().required(),
        packagePrice: Joi.number().required()
      })
    }),

    userCarSchema: Joi.object().keys({
      name: Joi.string().required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
      body: Joi.string().required(),
      condition: Joi.string().required(),
      transmission: Joi.string().required(),
      duty: Joi.string().required(),
      mileage: Joi.number().required(),
      price: Joi.number().required(),
      priceNegotiable: Joi.boolean().required(),
      fuel: Joi.string().required(),
      interior: Joi.string().required(),
      color: Joi.string().required(),
      engineSize: Joi.number().required(),
      description: Joi.string().required(),
      features: Joi.array().required(),
      location: Joi.string().required(),
    }),

    carSchema: Joi.object().keys({
      seller: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      name: Joi.string().required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
      body: Joi.string().required(),
      condition: Joi.string().required(),
      transmission: Joi.string().required(),
      duty: Joi.string().required(),
      mileage: Joi.number().required(),
      price: Joi.number().required(),
      priceNegotiable: Joi.boolean().required(),
      fuel: Joi.string().required(),
      interior: Joi.string().required(),
      color: Joi.string().required(),
      engineSize: Joi.number().required(),
      description: Joi.string().required(),
      location: Joi.string().required(),
    }),

    putCarSchema: Joi.object().keys({
      name: Joi.string().required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
      body: Joi.string().required(),
      condition: Joi.string().required(),
      transmission: Joi.string().required(),
      duty: Joi.string().required(),
      mileage: Joi.number().required(),
      price: Joi.number().required(),
      priceNegotiable: Joi.boolean().required(),
      fuel: Joi.string().required(),
      interior: Joi.string().required(),
      color: Joi.string().required(),
      engineSize: Joi.number().required(),
      description: Joi.string().required(),
      features: Joi.array().required(),
      location: Joi.string().required(),
    }),

    patchCarSchema: Joi.object().keys({
      name: Joi.string(),
      make: Joi.string(),
      model: Joi.string(),
      year: Joi.number(),
      body: Joi.string(),
      condition: Joi.string(),
      transmission: Joi.string(),
      duty: Joi.string(),
      mileage: Joi.number(),
      price: Joi.number(),
      priceNegotiable: Joi.boolean(),
      fuel: Joi.string(),
      interior: Joi.string(),
      color: Joi.string(),
      engineSize: Joi.number(),
      description: Joi.string(),
      features: Joi.array(),
      location: Joi.string(),
      seller: Joi.object().keys({
        sellerID: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        sellerNumber: Joi.number(),
        name: Joi.string(),
      }),
      verified: Joi.boolean(),
    }),

    featureCarSchema: Joi.object().keys({
      packageName: Joi.string().required(),
      packagePrice: Joi.string().required(),
    }),

    usersMessagingSchema: Joi.object().keys({
      topic: Joi.string().required(),
      title: Joi.string().required(),
      body: Joi.string().required(),
    }),

    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
