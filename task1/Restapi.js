const http = require("http");
const url = require("url");

let students = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true); 
  const method = req.method;

  const sendJSON = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  const getRequestBody = async () => {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          resolve(JSON.parse(body || "{}"));
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  if (method === "GET" && pathname === "/students") {
    return sendJSON(200, students);
  }

  if (method === "POST" && pathname === "/students") {
    getRequestBody()
      .then((body) => {
        const { name } = body;
        if (!name) return sendJSON(400, { error: "Name is required" });

        const newStudent = { id: nextId++, name };
        students.push(newStudent);
        sendJSON(201, newStudent);
      })
      .catch(() => sendJSON(400, { error: "Invalid JSON" }));
    return;
  }

  if (method === "PUT" && pathname.startsWith("/students/")) {
    const id = parseInt(pathname.split("/")[2]);
    getRequestBody()
      .then((body) => {
        const student = students.find((s) => s.id === id);
        if (!student) return sendJSON(404, { error: "Student not found" });

        student.name = body.name || student.name;
        sendJSON(200, student);
      })
      .catch(() => sendJSON(400, { error: "Invalid JSON" }));
    return;
  }

  if (method === "DELETE" && pathname.startsWith("/students/")) {
    const id = parseInt(pathname.split("/")[2]);
    const index = students.findIndex((s) => s.id === id);

    if (index === -1) return sendJSON(404, { error: "Student not found" });

    students.splice(index, 1);
    return sendJSON(200, { message: "Student deleted successfully" });
  }

  sendJSON(404, { error: "Route not found" });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
