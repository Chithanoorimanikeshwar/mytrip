const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Custom route to fetch posts with a specific title (using query parameters)
server.get('/buslist', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const {destination} = req.query;
  const availableroutes = router.db.get(destination.toLowerCase()).value();
  if(availableroutes){
    res.json(availableroutes);
  } else {
    res.status(404).json({
      error: 'Resource Not Found',
    });
  }
})
server.post('/userinfo',(req,res)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const {body}=req;
  server.db.userdata=body;
  res.status(201).json(body);
})

server.use(middlewares);
server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
