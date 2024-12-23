import { S3 } from "../lib/utils.js";
import { airtableBase as base } from "../index.js";
import { createId } from "@paralleldrive/cuid2";
import sharp from "sharp";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const addProduct = async (req, res) => {
  const { name, price, description, dataUrl } = req.body;

  let imageUrl;

  try {
    const imageFormat = dataUrl.slice(5, dataUrl.indexOf(";"));

    const imagePath = `marketplace/${createId()}.${imageFormat.split("/")[1]}`;

    imageUrl = `https://img.cvpfus.xyz/${imagePath}`;

    const originalBuffer = Buffer.from(dataUrl.split(",")[1], "base64");

    const resizedBuffer = await sharp(originalBuffer).resize(300).toBuffer();

    await S3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: imagePath,
        Body: resizedBuffer,
        ContentType: imageFormat,
      })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  base("Products").create(
    {
      "Product ID": createId(),
      Name: name,
      Price: Number(price),
      Description: description,
      "Image URL": imageUrl,
      Seller: [req.auth.recordId],
    },
    async (err, _) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(201).json({ message: "Product added successfully" });
    }
  );
};

export const getProduct = (req, res) => {
  const { productId } = req.params;

  base("Products").find(productId, (err, record) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(200).json({ ...record.fields, "Record ID": record.id });
  });
};

export const getProducts = (req, res, next) => {
  if (!!Object.keys(req.query).length) return next();

  base("Products")
    .select()
    .all((err, records) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(200).json(
        records.map((record) => ({
          Name: record.fields.Name,
          Description: record.fields.Description,
          Price: record.fields.Price,
          Image: record.fields["Image URL"],
          "Record ID": record.id,
          Username: record.fields.Username,
          TestImage: record.fields.Image,
        }))
      );
    });
};

export const getProductsByOwner = (req, res) => {
  const { ownerId } = req.query;

  const { recordId, userId } = req.auth;

  if (recordId !== ownerId) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  base("Products")
    .select({
      filterByFormula: `{User ID} = "${userId}"`,
    })
    .all((err, records) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(200).json(
        records.map((record) => ({
          Name: record.fields.Name,
          Description: record.fields.Description,
          Price: record.fields.Price,
          Image: record.fields["Image URL"],
          "Record ID": record.id,
        }))
      );
    });
};

export const updateProduct = (req, res) => {
  const { productId } = req.params;
  const { name, price, description, imageUrl } = req.body;

  base("Products").update(
    productId,
    {
      Name: name,
      Price: Number(price),
      Description: description,
      "Image URL": imageUrl,
    },
    (err, _) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(200).json({ message: "Product updated successfully" });
    }
  );
};

export const deleteProduct = (req, res) => {
  const { productId } = req.params;
  const { imageUrl } = req.query;

  base("Products").destroy(productId, async (err, _) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    try {
      const imagePath = imageUrl.split("/marketplace/")[1];

      await S3.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: `marketplace/${imagePath}`,
        })
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  });
};
