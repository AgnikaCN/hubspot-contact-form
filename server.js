import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();
const hubspotToken = process.env.HUBSPOT_TOKEN;
console.log("HubSpot Token:", hubspotToken);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.get("/api/contacts", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-type": "application/json",
        },
      }
    );
    const result = await response.json();

    console.log("result:", result);
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/contacts", async (req, res) => {
  const { email, firstName, lastName, phone } = req.body;

  const data = {
    properties: {
      email,
      firstname: firstName,
      lastname: lastName,
      phone,
    },
  };

  try {
    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName, phone } = req.body;
  const data = {
    properties: {
      email,
      firstname: firstName,
      lastname: lastName,
      phone,
    },
  };

  try {
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
