const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// models 
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

//connection
const connection = require('./database/database');


connection
    .authenticate()
    .then(() => {
        console.log('database online');
    })
    .catch((dbError) => {
        console.log(dbError);
    })


// express usando o engine do ejs
app.set('view engine', 'ejs');

// definindo como usar arquivos estáticos
app.use(express.static('public')) 

app.use(bodyParser.urlencoded({extended: false})); // traduz formato enviado por form
app.use(bodyParser.json()); // traduz formato json


app.get("/", (req, res) => {
    Pergunta.findAll({
        raw:true, 
        order:[
            ['id', 'DESC']
        ]
    }).then(perguntas => {
       res.render("index", {
           perguntas: perguntas
       });
    });
});

app.get("/pergunta/:id", (req, res) => {
   let id = req.params.id; 
   Pergunta.findOne({
       where:{id:id}
   }).then(pergunta => {
       
       if(pergunta != undefined) {
        console.log(pergunta)
        Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [['id', 'DESC']]
        }).then((respostas) => {
            console.log(respostas)
            res.render("pergunta", {
                pergunta:pergunta,
                respostas: respostas
            });
        })

        
       } else {
        res.redirect("/");
       }

   })
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    // o método create é responsável por salvar na base de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });

});

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.listen(8082, () => {
    console.log('app rodando na porta 8080');
})