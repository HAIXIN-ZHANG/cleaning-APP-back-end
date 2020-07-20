const Tradie = require('../models/tradie')
const User = require('../models/user');

const checkId = require("../utils/checkId");
const { deleteImage } = require("../utils/uploader");

async function addTradie(req, res) {
    const {
         tradieName, ABN, tradieHours, tradieDescription,
        tradieAddress, tradieEmail, tradiePhone, tradiePhoto
    } = req.body;

    const newTradie = new Tradie({
        tradieName, ABN, tradieHours, tradieDescription,
        tradieAddress, tradieEmail, tradiePhone, tradiePhoto
    });
    // req.user came form token decode.
    const user = await User.findById(req.user.account).exec();
    if (user.tradie) return res.status(400).json('tradie already exist');

    newTradie.user.addToSet(req.user.account);
    await newTradie.save();
    user.tradie.addToSet(newTradie._id);
    await user.save();
    return res.status(201).json(newTradie);
};

async function getTradiebyID(req, res) {
    const { tradieId } = req.params;
    
    const tradie = await Tradie.findById(tradieId).populate('order').exec();
    if (!tradie) return res.status(404).json('tradie is not exist');
    return res.status(200).json(tradie);

};

async function getAllTradies(req, res) {
    const tradies = await Tradie.find().populate('order').exec();
    if (!tradies) return res.status(404).json('not found any tradie');
    return res.status(200).json(tradies);
};

async function updateTradieById(req, res) {
    const { tradieId } = req.params;
    const { tradieName, ABN, tradieHours, tradieDescription,
    tradieAddress, tradieEmail, tradiePhone, tradiePhoto
    } = req.body;

    const checkTradie = await Tradie.findById(tradieId).exec();

    checkId(checkTradie, req, res);
    if ( res.statusCode === 401 ) return;
    
    const tradie = await Tradie.findByIdAndUpdate(
        tradieId,
        { tradieName, ABN, tradieHours, tradieDescription,
        tradieAddress, tradieEmail, tradiePhone, tradiePhoto },
        { new: true },).exec();

    if (!tradie) return res.status(404).json('tradie is not exist');
    return res.status(200).json(tradie);
};

async function getAllServicesById(req, res) {
    const { tradieId } = req.params;
    const tradie = await Tradie.findById(tradieId).populate('service').exec();

    checkId(tradie, req, res);
    if ( res.statusCode === 401 ) return;

    if (!tradie) return res.status(404).json('not a tradie')
    const services = tradie.service;
    if (!services) return res.status(404).json('this tradie does not have service')
    return res.status(200).json(services);
};

async function getAllOrdersById(req, res) {
    const { tradieId } = req.params;
    const tradie = await Tradie.findById(tradieId).populate('order').exec();

    checkId(tradie, req, res);
    if (res.statusCode === 401) return;

    if (!tradie) return res.status(404).json('not a tradie')
    const orders = tradie.order;
    if (!orders) return res.status(404).json('this tradie does not have order')
    return res.status(200).json(orders);
};


async function getOrdersByStatus(req, res) {
    const { tradieId } = req.params;
    const { status } = req.query;
    const tradie = await Tradie.findById(tradieId).populate('order').exec();

    checkId(tradie, req, res);
    if (res.statusCode === 401) return;

    if (!tradie) return res.status(404).json('not a tradie')
    const orders = tradie.order;
    if (!orders) return res.status(404).json('this tradie does not have order')
    // not sure if correct
    const tradies1 = Tradie.find({_id:tradieId,status:status}).exec();
    const ordersByStatus = tradies1.order;
    return res.status(200).json(ordersByStatus);  
}

async function updateTradieImage(req, res) {
    const { tradieId } = req.params;
	if (!req.file) {
		return res.status(400).json("Image missing");
	}
	const tradie = await Tradie.findById(tradieId).exec();

	if (!tradie) {
		await deleteImage(req.file.key);
		return res.status(404).json("Business not found");
	}
	if (!tradie.user || tradie.user._id.toString() !== req.user.id) {
		await deleteImage(req.file.key);
		return res.status(401).json("Access denied");
	}
	tradie.photo = req.file.location;
    await tradie.save();
	return res.status(200).json(tradie.photo);
};

module.exports = {
    addTradie,
    getAllTradies,
    getTradiebyID,
    updateTradieById,
    getAllServicesById,
    getAllOrdersById,
    getOrdersByStatus,
    updateTradieImage,
}