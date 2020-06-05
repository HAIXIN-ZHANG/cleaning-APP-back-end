const orderModel = require('../models/order');

async function addOrder(req, res){
    //TODO data from the front
    const order = new orderModel({_id:'abc123', name:'order1'});
    await order.save();
    return res.json(order);
};

function getOrder(req, res){};

function getAllOrders(req, res){
    res.json([{},{}]);
};

function updateOrder(req, res){};

function deleteOrder(req, res){};

module.exports = {
    addOrder,
    getOrder,
    getAllOrders,
    updateOrder,
    deleteOrder

}