import Package from "../models/Package.js";

//CREATE
export const createPackage = async (req, res, next) => {
    const newPackage = new Package(req.body)

    try{
        const savedPackage = await newPackage.save();
        res.status(200).json(savedPackage);
    } catch (err){
        next(err);
    }
}

//UPDATE
export const updatePackage = async (req, res, next) => {
    try{
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPackage);
    } catch (err){    
        next(err);
    }
}

//DELETE
export const deletePackage = async (req, res, next) => {
    try{
        await Package.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Package has been deleted");
    } catch (err){
        next(err);
    }
}

//GET
export const getPackage = async (req, res, next) => {
    try{
        const  packages = await Package.findById(
            req.params.id
        );
        res.status(200).json(packages);
    } catch (err){
        next(err);
    }
}

//GET ALL
export const getPackages = async (req, res, next) => {
    try {
        const { limit, destinationName, min, max } = req.query;
        const query = {
            destinationName: destinationName,
            price: { $gte: min || 1, $lte: max || 999999999 },
        };
        const packages = await Package.find(query).limit(parseInt(limit));
        return res.status(200).json(packages);
    } catch (err) {
        next(err);
    }
};

//GETMAINPACKAGES
export const getMainPackages = async (req, res, next) => {
    try {
        const { limit, mainPackage} = req.query;

        const query = {
            mainPackage: mainPackage === 'true', 
        };

        const packages = await Package.find(query).limit(parseInt(limit));

        return res.status(200).json(packages);
    } catch (err) {
        next(err);
    }
};


//COUNT BY TYPE
export const countByType = async (req, res, next) => {
    const packageTypes = req.query.packageTypes.split(",")
    try{
        const list = await Promise.all(packageTypes.map(packageType => {
            return Package.countDocuments({packageType:packageType})
        }));
        res.status(200).json(list);
    } catch (err){
        next(err);
    }
}

export const getallPackages = async (req, res, next) => {
    try {
        const allPackages = await Package.find();
        res.status(200).json(allPackages);
      } catch (err) {
    next(err);
  }
};

//GET ALL UNIQUE DESTINATIONS
export const getAllUniqueDestinations = async (req, res, next) => {
    try {
      const uniqueDestinations = await Package.distinct("destinationName");
      res.status(200).json(uniqueDestinations);
    } catch (err) {
      next(err);
    }
  };

//GET PACKAGE COUNT
export const countPackages = async (req, res, next) => {
    try {
        const totalCount = await Package.countDocuments();
        res.status(200).json({ totalCount });
    } catch (err) {
        next(err);
    }
};