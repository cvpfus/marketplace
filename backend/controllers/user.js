import { airtableBase as base } from "../index.js";
import bcrypt from "bcrypt";
import { createId } from "@paralleldrive/cuid2";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  base("Users")
    .select({ filterByFormula: `{Username} = '${username.toLowerCase()}'` })
    .firstPage((err, records) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (records.length > 0) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }

      base("Users").create(
        {
          "User ID": createId(),
          Username: username.toLowerCase(),
          Password: passwordHash,
        },
        (err, _) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  base("Users")
    .select({ filterByFormula: `{Username} = '${username.toLowerCase()}'` })
    .firstPage(async (err, records) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (records.length === 0) {
        res.status(400).json({ error: "Username does not exist" });
        return;
      }

      const user = records[0].fields;
      const passwordMatch = await bcrypt.compare(password, user.Password);

      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      const userForToken = {
        username: user.Username,
        recordId: records[0].id,
        userId: user["User ID"],
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      res
        .status(200)
        .json({
          token,
          username: user.Username,
          userId: user["User ID"],
          userRecordId: records[0].id,
        });
    });
};
