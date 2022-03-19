const router = require('express-promise-router')()
const PaymentsController = require('../controllers/payments')

const {validateParam, schemas, validateBody} = require('../helpers/routeHelpers')

router.route("/:userId/carPayments")
.post([validateParam(schemas.idSchema, "userId"),validateBody(schemas.carPaymentSchema)],PaymentsController.carPayments)

router.route("/:userId/carPayments")
.get(validateParam(schemas.idSchema, "userId"),PaymentsController.getUserPayments)

module.exports = router