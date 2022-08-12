import express from "express";
import { Shopify } from "@shopify/shopify-api";
import "dotenv/config";
import moment from "moment";
const app = express();

const port = 3001;
const { API_SECRET_KEY, SHOP } = process.env;

app.get("/", async (req, res) => {
  const client = new Shopify.Clients.Rest(SHOP, API_SECRET_KEY);
  const response = await client.get({
    path: `/products`,
  });
  const salida = {};
  response.body.products.forEach((producto) => {
    salida[producto.title] = {
      price: Number(producto.variants[0].price),
      status: producto.status,
      created_at: moment(producto.variants[0].created_at).format("YYYY-MM-DD"),
    };
  });
  console.log(salida);
  res.send(salida);
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
