const Service = require('../models/service');
const Tradie = require('../models/tradie');
const checkId = require("../utils/checkId");

async function getServiceById(req, res) {
  const { id } = req.params;
  const service = await Service.findById(id)
  .populate('tradie', 'tradieName tradieEmail tradiePhone').exec();

  if(!service) {
      return res.status(404).json('service not found');
  }
  return res.status(200).json(service); 
};

async function getAllServices(req, res) {
  const services = await Service.find().populate('tradie', 'tradieName tradieEmail tradiePhone').exec();
  if(!services) {
    return res.status(404).json('no services found');
  }
  return res.status(200).json(services);
};

async function getServicesByName(req, res) {
  const{tradieName} = req.query;
  const tradies = await Tradie.findBy({ tradieName:tradieName }).populate('service').exec();
  if(!tradies) return res.status(400).json("tradie not found");
  const service = tradies.service;
  return res.status(200).json(service);
}

async function addServiceToTradie(req, res) {
    const { type, numberOfServiceRoom, housingType, serviceDescription,
        servicePrice } = req.body;
    
    const{tradieId} = req.query;

    const tradie = await Tradie.findById(tradieId).exec();
    checkId(tradie, req, res);
    if ( res.statusCode === 401 ) return;
    if (!tradie) return res.status(404).json('not find a tradie')

    const newService = new Service ({
        type, numberOfServiceRoom, housingType, serviceDescription,
        servicePrice
    });
    newService.tradie.addToSet(tradieId);
    await newService.save();
    tradie.service.addToSet(newService._id);
    await tradie.save();
    return res.status(200).json(newService);

};

async function updateServiceByTradieId(req, res) {
    const { serviceId, tradieId } = req.params;
    const { type, numberOfServiceRoom, housingType, serviceDescription,
        servicePrice} = req.body;  

    const service = await Service.findById(serviceId).exec();
    if(!service){
      return res.status(404).json('service not found');
    };

    const tradie = await Tradie.findById(tradieId).exec();
    checkId(tradie, req, res);
    if ( res.statusCode === 401 ) return;
    if(!tradie){
      return res.status(404).json('tradie not found');
    };

    if(service.tradie._id === tradieId){
      const newService = await Service.findByIdAndUpdate(
        serviceId,
        {type, numberOfServiceRoom, housingType, serviceDescription,
         servicePrice },
        {new: true}).exec();

      return res.status(200).json(newService);
    }
    return res.status(404).json('update deny');
};

async function deleteServiceByTradieId(req, res) {
    const { serviceId, tradieId } = req.params;
    const service = await Service.findById(serviceId).exec();
    if (!service) {
      return res.status(404).json('service not found');
    };
    
    const tradie = await Tradie.findById(tradieId).exec();
    checkId(tradie, req, res);
    if ( res.statusCode === 401 ) return;
    if(!tradie){
      return res.status(404).json('tradie not found');
    };
    if(service.tradie._id === tradieId){
      const service = await Service.findByIdAndDelete(serviceId).exec();
    
    await Tradie.updateMany(
        {
          service: service._id
        },
        {
          $pull: {
            service: service._id
          }
        }
      );
      return res.status(200).json(service);
    }
    return res.status(404).json('delete service fail');
};

module.exports = {
    getServiceById,
    getAllServices,
    getServicesByName,
    addServiceToTradie,
    updateServiceByTradieId,
    deleteServiceByTradieId,
}