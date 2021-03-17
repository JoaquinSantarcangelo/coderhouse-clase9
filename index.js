const express = require("express");
var fs = require("fs");

const port = 8080;
const app = express();

//Global Counter
let itemsCounter = 0;
let randomItemCounter = 0;

const getItems = async () => {
  const data = await fs.readFileSync("productos.txt", "utf8");
  
  // Nota: Esta parte me da error
  // const aux = JSON.parse(data)
  // console.log(aux)
  
  return [
    { id: 1, title: "Nombre", price: "Precio", thumbnail: "Url" },
    { id: 2, title: "Nombrea", price: "Precio", thumbnail: "Url" },
    { id: 3, title: "Nombre", price: "Precio", thumbnail: "Url" },
    { id: 4, title: "Nombre", price: "Precio", thumbnail: "Url" },
  ];
};

app.get("/items", async (req, res) => {
  itemsCounter++;
  const items = await getItems();

  console.log(items);
  res.json({
    items: items,
    cantidad: 2,
  });
});

app.get("/random-item", async (req, res) => {
  randomItemCounter++;
  const items = await getItems();
  const item = items[Math.floor(Math.random() * items.length) + 1];
  console.log(items);
  res.json({
    item,
  });
});

app.get("/visitas", async (req, res) => {
  res.json({
    visitas: {
      items: itemsCounter,
      item: randomItemCounter,
    },
  });
});

app.listen(port, () => {
  console.log("Server is up");
});
