const Order = require("../model/orderSchema");

//place a new Order
const placeOrder = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    if(typeof(quantity) != Number){
      return res.status(400).json({message: 'Bad Content'})
    }
    let placedOrder = new Order({
      symbol,
      quantity,
      order_status: "open"
    });

    let ordered = await placedOrder.save();
    console.log("ordered", ordered);
    return res
      .status(201)
      .json({
        success: true,
        payload: ordered
      })

  } catch (error) {
    console.log(error);

  }
}

//Modify orders quantity
const modifyOrder = async (req, res) => {

  try {
    let { orderDocId, new_quantity } = req.body;
    let orderDetail = await Order.findById(orderDocId);
    console.log("orderDetail", orderDetail);
    if (!orderDetail || orderDetail.order_status != 'open') {
      return res.status(404).json({
        message: "invalid orderDocId or status of requested order is not open"
      })
    }
    let updatedOrderDetail = await Order.updateOne({
      "_id": orderDocId
    }, {
      $set:
        { quantity: new_quantity }
    });
    let finalorderDetail = await Order.findById(orderDocId);
    return res.status(202).json({
      success: true,
      payload: finalorderDetail
    })

  } catch (err) {
    console.log(err);
  }

};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    let { orderDocId } = req.body;
    let orderDetail = await Order.findById(orderDocId);
    if (!orderDetail) {
      return res.status(404).json({
        message: "Order does not exist"
      })
    }
    let cancelOrder = await Order.updateOne({
      _id: orderDocId
    }, {
      $set: {
        order_status: 'cancel',
      }
    })

    let canceledorderDetail = await Order.findById(orderDocId);
    return res.status(202).json({
      success: true,
      payload: canceledorderDetail
    })


  } catch (err) {
    console.log(err);
  }

};

// get Order Status

const getOrderStatus = async (req, res, next) => {
  try {
    let { orderDocId } = req.body;
    let orderDetail = await Order.findById(orderDocId);
    if (!orderDetail) {
      return res.status(404).json({
        message: "Order does not exist"
      })
    }
    return res.status(200).json({
      success:true,
      payload :  orderDetail
    })
   
  } catch (err) {
    console.log(err);
  }
 
};



exports.placeOrder = placeOrder;
exports.modifyOrder = modifyOrder;
exports.cancelOrder = cancelOrder;
exports.getOrderStatus = getOrderStatus;