const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const adminRoutes = require('./routes/admin.routes');
const errorHandler = require('./middlewares/error.middleware');
const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({origin: frontendUrl, credentials:true}));
app.use(express.json());

app.get('/', (req,res)=>res.json({msg:'Week 3-4 Advanced API Running'}));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);
module.exports = app;
