const express = require('express');
var cors = require('cors');
const path = require('path');
const colors = require('colors');

const dotenv = require('dotenv').config();
// const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// user route
app.use('/api/user', require('./routes/userRoutes'));

// Invoices
app.use('/api/invoices', require('./routes/invoiceRoutes'));

// Invoice id routes
app.use('/api/invoiceId', require('./routes/invoiceIdRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
    )
  );

} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}
app.listen(port, () => console.log(`Server started on port ${port}`));
