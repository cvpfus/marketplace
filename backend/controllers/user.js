import { airtableBase as base } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidEmail } from "../lib/utils.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  base("Users")
    .select({ filterByFormula: `{Email} = '${email.toLowerCase()}'` })
    .firstPage((err, records) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (records.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      base("Users").create(
        {
          Email: email.toLowerCase(),
          Name: name,
          Password: passwordHash,
          "Image URL": `https://api.dicebear.com/6.x/thumbs/png?seed=${email}`,
        },
        (err, _) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          return res
            .status(201)
            .json({ message: "User registered successfully" });
        }
      );
    });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  base("Users")
    .select({ filterByFormula: `{Email} = '${email.toLowerCase()}'` })
    .firstPage(async (err, records) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (records.length === 0) {
        return res.status(400).json({ error: "Email does not exist" });
      }

      const user = records[0].fields;
      const passwordMatch = await bcrypt.compare(password, user.Password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const userForToken = {
        name: user.Name,
        address: user.Address,
        email: user.Email,
        recordId: records[0].id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      res.status(200).json({
        token,
        name: user.Name,
        email: user.Email,
        userRecordId: records[0].id,
      });
    });
};

export const getUser = (req, res) => {
  const { userId } = req.params;

  const recordId = req.auth.recordId;

  if (userId !== recordId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  base("Users").find(userId, (err, record) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!record) {
      return res.status(404).json({ error: "User not found" });
    }

    const { Password, ...userData } = record.fields;

    return res.status(200).json(userData);
  });
};

export const updateAddress = (req, res) => {
  const { userId, address } = req.body;

  const recordId = req.auth.recordId;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  if (userId !== recordId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  base("Users").find(recordId, (err, record) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!record) {
      return res.status(404).json({ error: "User not found" });
    }

    base("Users").update(
      record.id,
      {
        Address: address,
      },
      (err, _) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res
          .status(200)
          .json({ message: "Address updated successfully" });
      }
    );
  });
};
