
const Order = require('../models/order');
const Service = require('../models/service');
const Client = require('../models/client');
const Tradie = require('../models/tradie');
const checkId = require("../utils/checkId");

async function addOrder(req, res) {

    const { 
        startDate, finishedDate, requireServiceTime, 
        serviceAddress, additionalServiceRequire, postCode, status
    } = req.body;

    const order = new Order({ 
        startDate, finishedDate, requireServiceTime, 
        serviceAddress, additionalServiceRequire, postCode, status
    });

    const { serviceId, clientId } = req.query;
    if (!serviceId || !clientId) {
        return res.status(400).json('Please input correct serviceId or clientId')
    };

    const service = await Service.findById(serviceId).populate('tradie').exec();
    const client = await Client.findById(clientId).exec();
    checkId(client, req, res);
    if ( res.statusCode === 401 ) return;
    if (!service || !client) {
        return res.status(404).json('service or client not exist')
    };

    const tradieId = service.tradie._id;
    const tradie = await Tradie.findById(tradieId).exec();

      order.service = service._id;
      order.tradie = tradieId;
      order.client = client._id;
    await order.save();

    tradie.order.addToSet(order._id);
     await tradie.save();

    client.order.addToSet(order._id);
    await client.save();

    return res.status(201).json(order);
};

async function getOrderById(req, res) {
    const{ id } = req.params;
    const order = await Order.findById(id)
    .populate('tradie')
    .populate('client')
    .populate('service').exec();

    if (!order) return res.status(404).json('Not found order');
    return res.status(200).json(order);
};

async function getAllOrders (req, res) {
    const orders = await Order.find()
    .populate('tradie')
    .populate('client')
    .populate('service').exec();

    if (!orders) return res.status(404).json('No orders');
    return res.status(200).json(orders);
};

async function updateOrderById (req, res) {
    const{ id } = req.params;
    const { 
        startDate, finishedDate, requireServiceTime, 
        serviceAddress, additionalServiceRequire, postCode, status
    } = req.body;
    const order = await Order.findByIdAndUpdate(
        id,
        {startDate, finishedDate, requireServiceTime, 
            serviceAddress, additionalServiceRequire, postCode, status},
        { new: true }).exec();

    if (!order) {
        return res.status(404).json('order not found');
    }
    return res.status(200).json(order);
}

async function updateOrderByTradie (req, res) {
    const { orderId, tradieId } = req.params;
    const { status } = req.query;
    const order = await Order.findById(orderId)
        .populate('tradie')
        .exec();

    const tradie = await Tradie.findById(tradieId).exec();
    checkId(tradie, req, res);
    if ( res.statusCode === 401 ) return;

    if (!order) return res.status(404).json("order not found");
    if (!tradie) return res.status(404).json("tradie not found");
    if (order.tradie._id !== tradieId) {
        return res.status(400).json("order not belongs to this tradie")
    };
    if (order.tradie.user.account !== req.user.account) {
        return res.status(401).json("Access denied");
    }

    if (order.status === 'Cancelled' || order.status === 'Finished') {
        return res.status(400).json('cannot change status')
    }

    order.status = status;
    await order.save();
    return res.status(200).json(order);
}

async function updateOrderByClient (req, res) {
    const { orderId, clientId } = req.params;
    const { status } = req.query;
    const order = await Order.findById(orderId)
        .populate('client')
        .exec();

    const client = await Tradie.findById(clientId).exec();
    checkId(client, req, res);
    if ( res.statusCode === 401 ) return;

    if (!order) return res.status(404).json("order not found");
    if (!client) return res.status(404).json("client not found");
    if (order.client._id !== clientId) {
        return res.status(400).json("order not belongs to this client")
    };
    if (order.client.user.account !== req.user.account) {
        return res.status(401).json("Access denied");
    }
    if ( order.status === 'Cancelled' || order.status === 'Finished' 
    || order.status === 'In Processing') {
        return res.status(400).json('cannot change status')
    }
    order.status = status;
    await order.save();
    return res.status(200).json(order);
}

module.exports = {
    addOrder,
    getOrderById,
    getAllOrders,
    updateOrderById,
    updateOrderByTradie,
    updateOrderByClient,
}