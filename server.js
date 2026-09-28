const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let livros = [
    {
        id: 1,
        titulo: "A odisseia",
        autor: "Homero",
        ano: "XVIII a.C"
    },
    {
        id: 2,
        titulo: "Harry Potter",
        autor: "J. K. Rowling",
        ano: 1997
    }
];

app.get("/", (req, res) => {
    res.json(livros);
});

app.get("/livros", (req, res) => {
    res.json(livros);
});

app.get("/livros/:id", (req, res) => {
    let id = Number(req.params.id);
    let livro = livros.find(livro => livro.id == id);

    if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.json(livro);
});

app.post("/livros", (req, res) => {
    let novoLivro = {
        id: livros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});

app.put("/livros/:id", (req, res) => {
    let id = Number(req.params.id);
    let livro = livros.find(livro => livro.id == id);

    if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    livro.titulo = req.body.titulo;
    livro.autor = req.body.autor;
    livro.ano = req.body.ano;

    res.json(livro);
});

app.delete("/livros/:id", (req, res) => {
    let id = Number(req.params.id);
    let indice = livros.findIndex(livro => livro.id == id);

    if (indice == -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    livros.splice(indice, 1);

    res.json({ mensagem: "Livro excluído com sucesso" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});