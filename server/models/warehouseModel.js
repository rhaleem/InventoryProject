const fs = require("fs");
const path = require("path");
// const { v4: uuidv4 } = require("uuid");

const warehouseFile = path.join(__dirname, "../db/warehouses.json");
const inventoryFile = path.join(__dirname, "../db/inventories.json");

function getWarehousesFromFile() {
  const data = fs.readFileSync(warehouseFile);
  return JSON.parse(data);
}

function list() {
  return getWarehousesFromFile();
}

// FUNCTION FOR "POST" NEW WAREHOUSE (ADDED BY YASH)
function warehouse_create_post(req, res) {
  const warehouseList = JSON.parse(fs.readFileSync(warehouseFile));
  console.log(req);
  const newObject = req.body;
  warehouseList.push(newObject);
  fs.writeFileSync(warehouseFile, JSON.stringify(warehouseList));
//OPTIONAL RESPONSE
  res.send(newObject);
}

function getWarehouseById(id) {

  const warehouseList = list();
  const thisWarehouse = warehouseList.find(warehouse => warehouse.id === id);
  return thisWarehouse;
}

function getWarehouseInventorybyId(id){
  const data = fs.readFileSync(inventoryFile);
  const inventoryList = JSON.parse(data);
  const warehouseInventory = inventoryList.filter(warehouse => warehouse.warehouseID === id);
  return warehouseInventory; 
}

function searchWarehouses(searchWord){
  const warehouseList = list();
  const returnWarehouses = warehouseList.filter(warehouse => warehouse.city === searchWord);
  console.log('returnWarehouses', returnWarehouses);
  return returnWarehouses;

}

module.exports = { list, warehouse_create_post, getWarehouseById, getWarehouseInventorybyId, searchWarehouses };
