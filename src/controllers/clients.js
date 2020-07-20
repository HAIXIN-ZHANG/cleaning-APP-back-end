const Client = require('../models/client')
const User = require('../models/user');
const Order = require('../models/order');
const Service = require('../models/service');

const checkId = require("../utils/checkId");
const { deleteImage } = require("../utils/uploader");

async function addClient(req, res) {

    const {
        clientName, membership, clientDescription, 
        clientEmail, clientPhone, clientPhoto
    } = req.body;

    const newClient = new Client({
        clientName, membership, clientDescription, 
        clientEmail, clientPhone, clientPhoto
    });
    // req.user came form token decode.
    const user = await User.findById(req.user.account).exec();
    if (user.client) return res.status(400).json('client already exist');

    newClient.user.addToSet(req.user.account);
    await newClient.save();
    user.client.addToSet(newClient._id);
    await user.save();
    return res.status(201).json(newClient);
};

async function getClientByID(req, res) {
    const { clientId } = req.params;
    
    const client = await User.findById(clientId).populate('order').exec();
    if (!client) return res.status(404).json('client is not exist');
    return res.status(200).json(client);

};

async function getAllClients(req, res) {
    const clients = await User.find().populate('order').exec();
    if (!clients) return res.status(404).json('not found any clients');
    return res.status(200).json(clients);
};

async function updateClientById(req, res) {
    const { clientId } = req.params;
    const { 
        clientName, membership, clientDescription, 
        clientEmail, clientPhone, clientPhoto
    } = req.body;

    const checkClient = await User.findById(clientId).exec();
    checkId(checkClient, req, res);
    if (res.statusCode === 401) return;

    const client = await User.findByIdAndUpdate(
        clientId,
        { clientName, membership, clientDescription, 
            clientEmail, clientPhone, clientPhoto },
        { new: true },).exec();

    if (!client) return res.status(404).json('client is not exist');
    return res.status(200).json(client);
};

async function getAllOrdersById(req, res) {
    const { clientId } = req.params;
    const client = await User.findById(clientId).populate('order').exec();
    if (!client) return res.status(404).json('not a client')
    const orders = client.order;
    if (!orders) return res.status(404).json('this client does not have order')
    return res.status(200).json(orders);
};

async function updateClientImage(req, res) {
    const { clientId } = req.params;
	if (!req.file) {
		return res.status(400).json("Image missing");
	}
	const client = await Client.findById(clientId).exec();

	if (!client) {
		await deleteImage(req.file.key);
		return res.status(404).json("Client not found");
	}
	if (!client.user || client.user._id.toString() !== req.user.id) {
		await deleteImage(req.file.key);
		return res.status(401).json("Access denied");
	}
	client.photo = req.file.location;
    await client.save();
	return res.status(200).json(client.photo);
};

module.exports = {
    addClient,
    getAllClients,
    getClientByID,
    updateClientById,
    getAllOrdersById,
    updateClientImage,
}