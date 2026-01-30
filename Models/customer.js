const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
  item : String,
  price : Number,
});

const customerSchema = new Schema({
  name : String,
  orders : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Order"
  },],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomers = async() =>{
    // let cust1 = new Customer({name: "Alice"}
    // );

    // let order1 = await Order.findOne({item: "Laptop"});
    // let order2 = await Order.findOne({item: "Phone"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let res = await cust1.save();
    // console.log("Customer saved:", res);

    let result = await Customer.find({}).populate("orders");
    console.log("Customer fetched:", result[0]);
};

findCustomers();

// const addOrders = async() =>{
//     let res = await Order.insertMany([
//         {item: "Laptop", price: 1200},
//         {item: "Phone", price: 800},
//         {item: "Tablet", price: 600}
//     ]);
//     console.log("Orders added:", res);
// };

// addOrders();