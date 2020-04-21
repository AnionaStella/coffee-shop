const express = require('express')
const sqlite = require('sqlite')

const app = express()
const cors = require('cors')
app.use(cors())
app.use('/images', express.static('images'))
app.use(express.json())

let database

sqlite.open('coffee-shop.sqlite').then(database_ => {
  database = database_
})

app.get('/products', (request, response) => {
  database.all('SELECT * FROM productList').then((products) => {
    response.send(products)
  })
})

app.get('/topProducts', (request, response) => {
  productArray = []
  database.all('SELECT p.*, sum(o.quantity) as amountOrdered FROM orders o join productList p on p.id = o.productId GROUP BY productid ORDER BY amountOrdered desc').then((products) => {
    if (request.query.amount) {
      for (i = 0; i < request.query.amount && i < products.length; i++) {
        productArray.push(products[i])
      }
    } else {
      productArray = products
    }
    response.status(200)
    response.send(productArray)
  })
})

app.get('/products/:category', (request, response) => {

  let whereClause;

  switch (request.params.category) {
    case 'All':
      whereClause = ' ';
      break;
    case 'Coffee':
      whereClause = " WHERE type='coffee' OR type='instant coffee' OR type='espresso' ";
      break;
    case 'Milk':
      whereClause = " WHERE type='milk' OR type='cream' "
      break;
    case 'Spices':
      whereClause = " WHERE type='sugar' OR type='spice' "
      break;
    case 'Syrup':
      whereClause = " WHERE type='syrup' "
      break;
    case 'Alcoholic':
      whereClause = " WHERE type='alcoholic' "
      break;
  }

  database.all('SELECT * FROM products' + whereClause).then((products) => {
    response.send(products)
  })
})

app.put('/control-panel/products/:id', (request, response) => {

  if (request.body.price == 0) {
    database.run(
      'UPDATE products SET quantity=? WHERE id=?',
      [request.body.quantity, request.params.id]
    )
  } else if (request.body.quantity == 0) {
    database.run(
      'UPDATE products SET price=? WHERE id=?',
      [request.body.price, request.params.id]
    )
  } else {
    database.run(
      'UPDATE products SET price=?, quantity=? WHERE id=?',
      [request.body.price, request.body.quantity, request.params.id]
    )
  }
  console.log("UPDATE successful");
  response.status(200)
  response.send(request.body)
})

app.get('/orders', (request, response) => {
  database.all('SELECT * FROM orders').then((orders) => {
    response.send(orders)
    console.log("GET request succeeded")
  })
})

app.post('/orders', (request, response) => {
  // response.status(418)
  console.log(request.body);
  database.run(
    'INSERT INTO orders VALUES (?, ?, ?, ?, ?)',
    [
      request.body.name,
      request.body.address,
      request.body.productId,
      request.body.quantity,
      "false"
    ]
  )
  console.log('POST Successful!');
  response.send(request.body)
})

app.listen(3000)