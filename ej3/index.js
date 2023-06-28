const express = require("express");
const app = express();
const puerto = 3000;
app.use(express.json());
const productos = [
  { id: 1, nombre: "Taza de Harry Potter", precio: 300 },
  { id: 2, nombre: "FIFA 22 PS5", precio: 1000 },
  { id: 3, nombre: "Figura Goku Super Saiyan", precio: 100 },
  { id: 4, nombre: "Zelda Breath of the Wild", precio: 200 },
  { id: 5, nombre: "Skin Valorant", precio: 120 },
  { id: 6, nombre: "Taza de Star Wars", precio: 220 },
];
app.listen(puerto, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});
/* Al llamar a localhost:3000/products se debe mostrar el siguiente JSON: */
app.get("/products", (req, res) => {
  res.send(productos);
});
/* Crear endpoint para poder crear un producto nuevo */
app.post("/products", (req, res) => {
  const newProduct = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio,
  };

  if (!req.body.nombre || !req.body.precio) {
    res.status(400).send({ msg: "Please fill all inputs" });
  } else {
    productos.push(newProduct);
    res.status(201).send({ productos });
  }
});
app.put("/id/:id", (req, res) => {
  const found = productos.some((product) => product.id == req.params.id);
  if (found) {
    productos.forEach((product) => {
      if (product.id == req.params.id) {
        (product.name = req.body.name ? req.body.name : product.name),
          (product.email = req.body.email ? req.body.email : product.email);
        res.send(product);
      }
    });
  } else {
    res
      .status(404)
      .send({ msg: `The product with id ${req.params.id} not found` });
  }
});

app.delete("/id/:id", (req, res) => {
  const found = productos.some((product) => product.id == req.params.id); //para saber si existe lo que busco
  if (found) {
    //eliminar un product
    res.send(productos.filter((product) => product.id != req.params.id));
  } else {
    //si el producto que buscamos no existe devovlemos un notfound
    res.status(404).send({ msg: `product with id ${req.params.id} not found` });
  }
});
app.get("/productsBetween50and250", (req, res) => {
  res.send(
    productos.filter((product) => product.precio > 50 && product.precio < 250)
  );
});

app.get("/products/:id", (req, res) => {
  const found = productos.some((product) => product.id == req.params.id);
  if (found) {
    res.send(productos.filter((product) => product.id == req.params.id));
  } else {
    res.status(404).send({ msg: `product with id ${req.params.id} not found` });
  }
});
app.get("/products/:nombre", (req, res) => {
  const found = productos.some((product) => product.nombre == req.params.nombre);
  if (found) {
    res.send(productos.filter((product) => product.nombre == req.params.nombre));
  } else {
    res.status(404).send({ msg: `product with name ${req.params.nombre} not found` });
  }
});
