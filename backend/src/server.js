const app = require('./app');
const { sequelize } = require('./models');
const seedDatabase = require('./seedData');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Socket.IO for real-time notifications
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join', (userId) => {
    socket.join(`user:${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible in routes
app.set('io', io);

// Database sync and server start
sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(async () => {
    console.log('✓ Database connected');
    
    // Seed sample data
    await seedDatabase();
    
    server.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('✗ Database connection failed:', err);
    process.exit(1);
  });
