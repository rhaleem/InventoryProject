const warehouse = require("../models/warehouseModel");

const fs = require("fs");

function listWarehouses(_req, res) {
  res.json(warehouse.list());
}

function getWarehouseById(req, res) {
  res.json(warehouse.getWarehouseById(req.params.id));
}

function deleteWarehouse(req, res) {
  const warehouses = warehouse.list();
  const warehouseIndex = warehouses.findIndex(
    (warehouse) => warehouse.id === req.params.id
  );
  const clickedWarehouse = warehouses.splice(warehouseIndex, 1);
  fs.writeFileSync("./db/warehouses.json", JSON.stringify(warehouses));

  const inventories = JSON.parse(fs.readFileSync("./db/inventories.json"));
  const inventoryOfWarehouse = inventories.filter(
    (inventory) => inventory.warehouseID !== req.params.id
  );
  fs.writeFileSync(
    "./db/inventories.json",
    JSON.stringify(inventoryOfWarehouse)
  );

  res.json(clickedWarehouse);
}

function getWarehouseInventorybyId(req, res) {
  res.json(warehouse.getWarehouseInventorybyId(req.params.id)); // params = warehouse ID and then the function returns back an array of stuff under that warehouse
}

function deleteWarehouseInventorybyId(req, res) {
  const inventoryID = req.params.id;
  const inventoryData = JSON.parse(fs.readFileSync("./db/inventories.json"));
  const inventoryIndex = inventoryData.findIndex(
    (inventory) => inventoryID === inventory.id
  );
  const itemRemoved = inventoryData.splice(inventoryIndex, 1);
  fs.writeFileSync("./db/inventories.json", JSON.stringify(inventoryData));
  res.json(itemRemoved);
}

// POST REQUEST: CREATE NEW WAREHOUSE (ADDED BY YASH)
function addWarehouse(req, res) {
  warehouse.warehouse_create_post(req, res);
}

function searchWarehouses(req, res) {
  res.json(warehouse.searchWarehouses(req.body.name));
}

function editWarehouse(req, res) {
  console.log("req.body", req.body);
  res.json(warehouse.editWarehouse(req.body));
}

module.exports = {
  listWarehouses,
  addWarehouse,
  getWarehouseById,
  deleteWarehouse,
  getWarehouseInventorybyId,
  deleteWarehouseInventorybyId,
  searchWarehouses,
  editWarehouse,
};
