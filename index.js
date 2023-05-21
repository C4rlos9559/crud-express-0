/*const http = require("http");
const hostname = "127.0.0.1";
const PORT = 3001;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});*/
const express = require("express");
const app = express();
app.use(express.json()); //Para convertir los datos que envío en json

let notes = [
  {
    id: "1",
    name: "HTML is easy",
  },
  {
    id: "2",
    name: "Browser can execute only Javascript",
  },
  {
    id: "3",
    name: "GET and POST are the most important methods of HTTP protocol",
  },
];

app.get("/notes/:id", (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;
  const note = notes.find(function (element) {
    return id === element.id;
  });

  if (note) {
    res.json(note);
  } else {
    next({
      statusCode: 404,
      message: `Note with ${id}, Not Found`,
    });
  }
});

app.post("/notes", (req, res) => {
  const { body } = req;
  notes.push(body);
  res.status(201).json(body);
});

app.get("/notes", (request, response) => {
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//4. Put (Se envía el body)
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.name = name;
  res.json(note);
});

//5. Delete
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes.splice(index, 1);
  res.sendStatus(204);
});
