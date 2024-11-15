const express = require('express');
const morgan = require('morgan');
const productsRouter = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the E-commerce Products API',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      root: {
        path: '/',
        method: 'GET',
        description: 'API information and status'
      },
      products: {
        list: {
          path: '/api/products',
          method: 'GET',
          description: 'Get all products'
        },
        single: {
          path: '/api/products/:id',
          method: 'GET',
          description: 'Get a single product'
        },
        create: {
          path: '/api/products',
          method: 'POST',
          description: 'Create a new product'
        },
        update: {
          path: '/api/products/:id',
          method: 'PUT',
          description: 'Update an existing product'
        },
        delete: {
          path: '/api/products/:id',
          method: 'DELETE',
          description: 'Delete a product'
        }
      }
    },
    documentation: 'For more information, visit /api/docs (coming soon)',
    maintainer: 'Your Team Name',
    lastUpdate: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/blocked', (req, res) => {
  res.json({
    status: 'blocked',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/products', productsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});