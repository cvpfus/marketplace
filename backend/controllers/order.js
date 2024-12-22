import { airtableBase as base } from "../index.js";
import { createId } from "@paralleldrive/cuid2";

export const addOrder = (req, res) => {
  const { name, address, productId, sellerId } = req.body;

  const userId = req.auth.recordId;

  if (sellerId === userId) {
    res.status(400).json({ error: "You cannot buy your own product" });
    return;
  }

  base("Orders").create(
    {
      "Order ID": createId(),
      Name: name,
      Address: address,
      Product: [productId],
      Buyer: [userId],
      Seller: [sellerId],
    },
    (err, _) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(201).json({ message: "Order added successfully" });
    }
  );
};

export const getOrder = (req, res) => {
  const { id } = req.params;

  base("Orders").find(id, (err, record) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(200).json(record.fields);
  });
};

export const getOrders = (req, res) => {
  base("Orders")
    .select({ view: "Grid view" })
    .all((err, records) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(200).json(records.map((record) => record.fields));
    });
};

export const updateOrderStatus = (req, res) => {
  const { id, orderStatus } = req.body;

  const userId = req.auth.recordId;

  base("Orders").find(id, (err, record) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    console.log(userId);

    console.log(record.fields.Seller[0]);
    if (userId !== record.fields.Seller[0]) {
      res
        .status(403)
        .json({ error: "You are not authorized to update this order" });
      return;
    }

    base("Orders").update(
      id,
      {
        "Order Status": orderStatus,
      },
      (err, _) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.status(200).json({ message: "Order status updated successfully" });
      }
    );
  });
};
