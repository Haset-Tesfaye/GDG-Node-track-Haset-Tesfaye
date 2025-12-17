import express from "express";
const app = express();
const port = 3000;
app.get("/home", (req, res) => {
  res.status(200).type("text/html").send(`
      <html>
        <body>
          <h1 style="color: green;">Welcome</h1>
        </body>
      </html>
    `);
});
app.get("/about", (req, res) => {
  res
    .status(200)
    .type("text/plain")
    .send("This is the about page of our Express application.");
});
app.get("/students/:studentId", (req, res) => {
  res.status(200).json({
    studentId: req.params.studentId,
    department: req.query.department,
  });
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
