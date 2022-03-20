const router = require("express-promise-router")();

const CarsController = require("../controllers/cars");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routeHelpers");

router.route("/listCars").get(CarsController.index);

router.route("/listTrendingCars").get(CarsController.getTrendingCars);

router.route("/listFeaturedCars").get(CarsController.getFeaturedCars);

router.route("/listAdminCars").get(CarsController.getAdminCars);

//.post(validateBody(schemas.carSchema), CarsController.newCar)

router
  .route("/:carId")
  .get(validateParam(schemas.idSchema, "carId"), CarsController.getCar)
  .put(
    [
      validateParam(schemas.idSchema, "carId"),
      validateBody(schemas.putCarSchema),
    ],
    CarsController.replaceCar
  )
  .patch(
    [
      validateParam(schemas.idSchema, "carId"),
      validateBody(schemas.patchCarSchema),
    ],
    CarsController.updateCar
  );

router
  .route("/:carId/featureCar")
  .patch(
    [
      validateParam(schemas.idSchema, "carId"),
      validateBody(schemas.featureCarSchema),
    ],
    CarsController.featureCar
  );


router
  .route("/:carId/deleteCar")
  .delete(validateParam(schemas.idSchema, "carId"), CarsController.deleteCar);

router
  .route("/:carId/approveCar")
  .patch(validateParam(schemas.idSchema, "carId"), CarsController.approveCar);

router
  .route("/:carId/declineCar")
  .patch(validateParam(schemas.idSchema, "carId"), CarsController.declineCar);

router
  .route("/:carId/carSold")
  .patch(validateParam(schemas.idSchema, "carId"), CarsController.carSold);

router
  .route("/:carId/carImages")
  .post(validateParam(schemas.idSchema, "carId"), CarsController.postCarImages);

router
  .route("/:carId/carViewed")
  .post(validateParam(schemas.idSchema, "carId"), CarsController.carViewed);

router
  .route("/:carId/carImages")
  .patch(
    validateParam(schemas.idSchema, "carId"),
    CarsController.deleteCarImage
  );

module.exports = router;
