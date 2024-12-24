import { airtableBase as base } from "../index.js";
import { createId } from "@paralleldrive/cuid2";
import { getCurrentDate } from "../lib/utils.js";

export const addOrder = (req, res) => {
  const { amount, productId } = req.body;

  const userId = req.auth.recordId;

  if (Number(amount) > 100) {
    return res.status(400).json({ error: "Amount cannot be more than 100" });
  }

  if (!amount || !productId) {
    return res
      .status(400)
      .json({ error: "Amount and product ID are required" });
  }

  base("Users").find(userId, (err, record) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!record) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!record.fields.Address) {
      return res.status(400).json({ error: "Address cannot be empty" });
    }

    base("Products").find(productId, (err, record) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!record) {
        return res.status(404).json({ error: "Product not found" });
      }

      const sellerId = record.fields.Seller[0];

      if (sellerId === userId) {
        return res
          .status(400)
          .json({ error: "You cannot buy your own product" });
      }

      base("Orders").create(
        {
          "Order ID": createId(),
          Amount: Number(amount),
          Product: [productId],
          Buyer: [userId],
          Seller: [sellerId],
          "Date Ordered": getCurrentDate(),
        },
        (err, _) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          return res.status(201).json({ message: "Order added successfully" });
        }
      );
    });
  });
};

export const getOrder = (req, res) => {
  const { id } = req.params;

  base("Orders").find(id, (err, record) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(record.fields);
  });
};

export const getOrders = (req, res) => {
  const recordId = req.auth.recordId;
  const { filterBy } = req.query;

  if (!filterBy) {
    return base("Orders")
      .select()
      .all((err, records) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res.status(200).json(
          records.map((record) => ({
            ...record.fields,
            "Record ID": record.id,
          }))
        );
      });
  }

  if (filterBy === "Buyer") {
    return base("Orders")
      .select()
      .all((err, records) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res.status(200).json(
          records
            .map((record) => ({
              ...record.fields,
              "Record ID": record.id,
            }))
            .filter((record) => record.Buyer[0] === recordId)
        );
      });
  }

  return base("Orders")
    .select()
    .all((err, records) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.status(200).json(
        records
          .map((record) => ({
            ...record.fields,
            "Record ID": record.id,
          }))
          .filter((record) => record.Seller[0] === recordId)
      );
    });
};

export const updateOrderStatus = (req, res) => {
  const { id, orderStatus } = req.body;

  const userId = req.auth.recordId;

  base("Orders").find(id, (err, record) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (userId !== record.fields.Seller[0]) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this order" });
    }

    base("Orders").update(
      id,
      {
        "Order Status": orderStatus,
      },
      (err, _) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res
          .status(200)
          .json({ message: "Order status updated successfully" });
      }
    );
  });
};
