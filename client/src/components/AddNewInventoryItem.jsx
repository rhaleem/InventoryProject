import React from "react";

class AddNewInventoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.form = React.createRef();
  }

  state = {
    nameError: false,
    descriptionError: false,
    categoryError: false,
    statusError: false,
    quantityNameError: false,
    warehouseError: false,
  };

  submitHandler(event) {
    event.preventDefault();

    // RETRIEVE THE VALUES FROM THE FORM
    let id = uuidv4();
    let name = this.form.current.name.value;
    let description = this.form.current.description.value;
    let category = this.form.current.category.value;
    let status = this.form.current.status.value;
    let quantity = this.form.current.quantity.value;
    let warehouse = this.form.current.warehouse.value;

    //VALIDATE THAT WE HAVE ALL THE DATA THAT WE NEED
    if (
      id &&
      name &&
      description &&
      category &&
      status &&
      quantity &&
      warehouse
    ) {
      // POST THE NEW WAREHOUSE DETAILS TO OUR DATABASE
      axios.post("http://localhost:8080/api/inventory", {
        id: id,
        name: name,
        description: address,
        category: city,
        status: country,
        quantity: quantity,
        warehouse: warehouse,
      });

      this.setState({ nameError: false });
      this.setState({ descriptionError: false });
      this.setState({ categoryError: false });
      this.setState({ statusError: false });
      this.setState({ quantityNameError: false });
      this.setState({ warehouseError: false });

      window.alert("Inventory successfully added!");

      //RESET THE FORM
      event.target.reset();
    } else {
      if (!name) this.setState({ nameError: true });
      if (!description) this.setState({ descriptionError: true });
      if (!category) this.setState({ categoryError: true });
      if (!status) this.setState({ statusError: true });
      if (!quantity) this.setState({ quantityError: true });
      if (!warehouse) this.setState({ warehouseError: true });
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className="add-warehouse">
        <h1 className="add-warehouse__heading">Add New Inventory Item</h1>
        <div className="add-warehouse__details-availability-container">
          <div className="add-warehouse__warehouse-details">
            <h3 className="add-warehouse__subheading">Item Details</h3>
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              name="name"
              className="add-warehouse__name"
              placeholder="Warehouse Name"
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.nameError ? "flex" : "none" }}
            ></div>

            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              className="add-warehouse__description"
              placeholder="Please enter a brief item description..."
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.descriptionError ? "flex" : "none" }}
            ></div>

            <label htmlFor="category">Category</label>
            <select
              type="text"
              name="category"
              className="add-warehouse__category"
              placeholder="Please select"
            >
              <option value="electronics">Electronics</option>
            </select>

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.categoryError ? "flex" : "none" }}
            ></div>
          </div>

          {/* ITEM AVAILABILITY */}

          <div className="add-warehouse__contact-details">
            <h3 className="add-warehouse__subheading">Item Availability</h3>
            <label htmlFor="status">Status</label>
            <div className="add-inventory__radio-container">
              <input
                type="radio"
                name="status"
                className="add-inventory__radio"
                value="In stock"
              />

              <label class="radio-label" for="status">
                In stock
              </label>

              <input
                type="radio"
                name="status"
                className="add-inventory__radio"
                value="Out of stock"
              />
              <label htmlFor="status">Out of Stock</label>
            </div>
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.statusError ? "flex" : "none" }}
            ></div>

            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              name="quantity"
              className="add-warehouse__position"
              placeholder="Position"
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.quantityError ? "flex" : "none" }}
            ></div>

            <label htmlFor="warehouse">Warehouse</label>
            <input
              type="text"
              name="warehouse"
              className="add-warehouse__number"
              placeholder="Number"
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.warehouseError ? "flex" : "none" }}
            ></div>
          </div>
        </div>
        <div className="add-warehouse__btn-container">
          <button className="add-warehouse__cancel-btn">Cancel</button>
          <button className="add-warehouse__save-add-btn">+ Add Item</button>
        </div>
      </form>
    );
  }
}

export default AddNewInventoryItem;
