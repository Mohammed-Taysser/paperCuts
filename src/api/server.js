const PORT = 8080,
  jsonServer = require('json-server'),
  server = jsonServer.create(),
  middleWares = jsonServer.defaults(),
  path = require('path'),
  router = jsonServer.router(path.join(__dirname, 'db.json'));

// Set default middleWares (logger, static, cors and no-cache)
server.use(middleWares);

// Use default router
server.use(router);
server.listen(PORT, () => {
  console.log(`\n \\{^_^}/ Hi! \n`);
  console.log(`JSON Server is running on ${PORT} \n`);
  console.log(`http://localhost:${PORT}/db`);
});
