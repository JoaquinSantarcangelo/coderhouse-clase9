const express = require("express");
var bodyParser = require("body-parser");
const port = 8080;
const app = express();

app.use(bodyParser.json({ type: "application/*+json" }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Variables
let idCounter = 0;
let products = [{ id: 0, title: "Title", price: 23, thumbnail: "Thumbnail" }];

//Rutas

//GET LISTA COMPLETA
app.get("/api/productos/listar", (req, res) => {
  res.json({ products: products });
});

//GET PRODUCTO
app.get("/api/productos/listar/:id", (req, res) => {
  if (products[req.params.id]) {
    res.json({ productInfo: products[req.params.id] });
  } else {
    res.json({ error: "No hay productos cargados" });
  }
});

//GUARDAR PRODUCTO
app.post("/api/productos/guardar", (req, res) => {
  const { title, price, thumbnail } = req.body;

  const product = {
    id: idCounter + 1,
    title: title,
    price: price,
    thumbnail: thumbnail,
  };
  
  idCounter++;
  products.push(product);
  res.json({ productInfo: product });
});

app.listen(port, () => {
  console.log("Server is up");
});
