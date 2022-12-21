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
app.use(cors({origin: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/invoiceId', require('./routes/invoiceIdRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
