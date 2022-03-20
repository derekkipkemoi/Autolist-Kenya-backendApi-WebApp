const Car = require("../models/car");
const User = require("../models/user");
const _ = require("lodash");
const path = require("path");
const fs = require("fs").promises;
const { toPath } = require("lodash");



module.exports = {
  index: async (req, res, next) => {
    //Get all the cars
    const cars = await Car.find({ $and: [{ status: "active" }] });

    res.status(200).json(cars);
  },

  getTrendingCars: async (req, res, next) => {
    //Get all the cars
    var cars = await Car.find({ $and: [{ status: "active" }] });

    cars.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));

   cars = cars.sort(function(a, b) {
      var c = new Date(a.createdAt);
      var d = new Date(b.createdAt);
      return c-d;
  });

    res.status(200).json(cars);
  },

  getFeaturedCars: async (req, res, next) => {
    //Get all the cars
    var cars = await Car.find({ $and: [{ status: "active" }] });

    cars.sort((a, b) => parseFloat(a.views) - parseFloat(b.views));

   cars = cars.sort(function(a, b) {
      var c = new Date(a.createdAt);
      var d = new Date(b.createdAt);
      return d-c;
  });

    res.status(200).json(cars);
  },


  getAdminCars: async (req, res, next) => {
    //Get all the cars
    const cars = await Car.find().select(
      "_id name make model year body condition transmission duty sold verified featured mileage price priceNegotiable fuel interior color engineSize description features location seller images status views"
    );

    res.status(200).json(cars);
  },

  postCarImages: async (req, res, next) => {
    if (!req.files) {
      res.send({ status: false, message: "No file uploaded" });
    } else {
      const { carId } = req.value.params;
      const carObject = await Car.findById(carId);

      const url = process.env.FILES_URI;
      //loop all files
      if (req.files.photos instanceof Array) {
        _.forEach(_.keysIn(req.files.photos), (key) => {
          const photo = req.files.photos[key];
          const currentPhoto = Date.now() + photo.name.replace(/\s/g, "");
          photo.mv("./uploads/" + currentPhoto);
          const image = url + "/uploads/" + currentPhoto;
          carObject.images.push(image);
        });
      } else {
        const photo = req.files[Object.keys(req.files)[0]];
        const currentPhoto = Date.now() + photo.name;
        photo.mv("./uploads/" + currentPhoto);
        const image = url + "/uploads/" + currentPhoto;
        console.log(image)
        carObject.images.push(image);
        console.log(carObject.images.length);
      }

      //return response
      const message = "Car Details and Images uploaded successfuly";
      await carObject.save();
      res.status(200).json({ carObject, message });
    }
  },

  deleteCarImage: async (req, res, next) => {
    const { carId } = req.value.params;
    const carObject = await Car.findById(carId);
    const { imageUrl } = req.body;
  
    const imageExist = carObject.images.includes(imageUrl);
    if (!imageExist) {
      const message = "Image does not exist";
      return res.status(200).json({
        message,
      });
    }
    

    const lastSegment = imageUrl.split("/").pop();  // handle potential trailing slash
    await fs.unlink("./uploads/" + lastSegment);


    await carObject.images.pull(imageUrl);
    //console.log(url.pathname);
    
    //return response
    const message = "Car image deleted successfuly";
    await carObject.save();
    res.status(200).json({ message });
  },

  featureCar: async (req, res, next) => {
    const { carId } = req.value.params;
    var date = new Date();
    const nowDate = new Date(); // Now
    date.setDate(date.getDate() + 30);
    await Car.findByIdAndUpdate(carId, {
      "featured.startDay": nowDate,
      "featured.endDay": date,
      "featured.featuredCarPackage.packageName": req.body.packageName,
      "featured.featuredCarPackage.packagePrice": req.body.packagePrice,
    });
    const message = "Completed Successfully";
    res.status(200).json({ message });
  },

  approveCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const car = await Car.findById(carId);
    if (!car) {
      const message = "Car Does Not Exist";
      return res.status(200).json({
        message,
      });
    }
    await Car.findByIdAndUpdate(carId, {
      status: "active",
    });

    const message = "Car Approved Successfully";
    res.status(200).json({
      message,
    });
  },

  declineCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const car = await Car.findById(carId);
    if (!car) {
      const message = "Car Does Not Exist";
      return res.status(200).json({
        message,
      });
    }
    await Car.findByIdAndUpdate(carId, {
      status: "declined",
    });

    const message = "Car Declined Successfully";
    res.status(200).json({
      message,
    });
  },

  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params;
    //Get Car
    const car = await Car.findById(carId);
    if (!car) {
      const message = "Car Does Not Exist";
      return res.status(404).json({
        message,
      });
    }
    const sellerId = car.seller.sellerID;
    //Get Seller
    const seller = await User.findById(sellerId);

    //Remove car

    // images.forEach(function (filename) {
    //   var url = new URL(images[i]);
    //   fs.unlink(filename);
    // });
    const images = car.images;
    for (i = 0; i < images.length; i++) {
      try {
        var url = new URL(images[i]);
        console.log("." + url.pathname);
        await fs.unlink("." + url.pathname);
      } catch (e) {
        console.log(e);
      }
    }

    await car.remove();
    await seller.cars.pull(car);
    //Remove car from the seller list

    await seller.save();
    const message = "Car Deleted Successfully";
    res.status(200).json({
      message,
    });
  },

  carSold: async (req, res, next) => {
    const { carId } = req.value.params;
    const car = await Car.findById(carId);
    if (!car) {
      const message = "Car Does Not Exist";
      return res.status(200).json({
        message,
      });
    }
    await Car.findByIdAndUpdate(carId, {
      status: "sold",
    });

    const message = "Car Sold Successfully";
    res.status(200).json({ message });
  },

  updateCar: async (req, res, next) => {
    const { carId } = req.value.params;
    console.log("Status", carId);
    var carObject = await Car.findById(carId);
    if (!carObject) {
      const message = "Car Does Not in Existence";
      return res.status(200).json({
        message,
      });
    }
    var status = (carObject.status)
    carObject = req.value.body;
    carObject.status = "underreview"
    
    await Car.findByIdAndUpdate(carId, carObject);
    //  if(updatedCar.status == "declined"){
    //    updatedCar.status = "underreview"
    //    await updatedCar.save()
    //  }

    const message = "Car Edited Successfully";
    res.status(200).json({ carObject, message });
  },

  newCar: async (req, res, next) => {
    console.log("req.value", req.value);
    //Find the actual seller
    const seller = await User.findById(req.value.body.seller).select(
      "_id name email cars"
    );
    //Creat a new car
    const newCar = req.value.body;
    newCar.seller = seller;
    const car = new Car(newCar);
    await car.save();
    // Add new created car to actual selller
    seller.cars.push(car);
    await seller.save();
    //Were done
    res.status(200).json(car);
  },

  getCar: async (req, res, next) => {
    const carObject = await Car.findById(req.value.params.carId);
    if (!carObject) {
      const message = "This car does not exist";
      return res.status(200).json({ message });
    }
    const message = "Car found";
    res.status(200).json({ carObject, message });
  },

  // getFeaturedCars: async (req, res, next) => {
  //   const data = await Car.find().sort('createdAt');
  //   console.log(data);
  //   res.status(200).json({ data });
  // },

  carViewed: async (req, res, next) => {
    const carId = req.value.params.carId;
    const carObject = await Car.findByIdAndUpdate(
      { _id: carId },
      { $inc: { views: 1 } }
    );
    if (!carObject) {
      const message = "This car does not exist";
      return res.status(200).json({ message });
    }
    const message = "Car Viewed";
    res.status(200).json({ message });
  },

  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ success: true });
  },
};
