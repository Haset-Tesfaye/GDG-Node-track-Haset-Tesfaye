const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain"); 
 
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end("Welcome to the Home Page");
  } else if (req.method === "GET" && req.url === "/info") {
    res.statusCode = 200;
    res.end("This is the information page");
  } 
  else if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        res.statusCode = 200;
        res.end(JSON.stringify(data)); 
      } catch (err) {
        res.statusCode = 400;
        res.end("Invalid JSON"); 
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});


server.listen(3000, () => {
  console.log("Plain Text HTTP Server running at http://localhost:3000/");
});
