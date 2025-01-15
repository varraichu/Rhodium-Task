const Cars = require('../models/carsModel');

exports.createListing = async (req, res) => {
    try {
        const {model, postedBy, price, phone_number, max_pictures, pictures} = req.body;
        
        if(!model){
            return res.status(400).json({message: "Please enter model"})
        }
        if(!price){
            return res.status(400).json({message: "Please enter price"})
        }
        if(!phone_number){
            return res.status(400).json({message: "Please enter phone number"})
        }
        if(!max_pictures){
            return res.status(400).json({message: "Please enter a number for the amount of pictures you are uploading"})
        }

        const maxPictures = parseInt(max_pictures);
        if(maxPictures > 10){
            return res.status(400).json({message: "You can only upload 10 images total"})
        }
        if(maxPictures < 1){
            return res.status(400).json({message: "You have to upload 1 image minimum"})
        }
        
        if (pictures.length !== parseInt(max_pictures)){
            return res.status(400).json({message: "Please make sure the maximum pictures selected and the amount you upload is the same"})
        }
        
        const newCar = new Cars({
            model,
            postedBy,
            price,
            phone_number,
            max_pictures,
            pictures
        })
        
        const carResponse = await newCar.save();
        res.status(201).json(carResponse);
    }
    catch (error) {
        console.error("error");
        res.status(500).json({ message: error.message })
    }
}

exports.getListings = async(req,res) =>{
    try{
        const listings = await Cars.find();
        res.status(200).json(listings);
    }
    catch(error){
        console.error("error");
        res.status(500).json({ message: error.message });
    }
}