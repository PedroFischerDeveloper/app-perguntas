# instalations
npm install express  --save
npm install express ejs --save 

ejs é uma engine para montar estruturas html utilizando o express
basta criar um arquivo dentro da pasta views, importante: a nomeclatura 
precisa ser views para que o express compreenda e localize os templates

npm install body-parser --save
traduz os dados que serão enviando por formulário em uma estrutura javascript
que possa ser entendida pelo projeto


npm install --save sequelize
ORM para a manipulação do banco

npm install --save mysql2
dependencia para trabalhar com o mysql

database 
após a instalação do sequelize e do mysql2
foi criado o arquivo responsável por criar instanciar e criar conexão

logo após criamos a model Pergunta, chamamos o sequelize, instanciamos a connection
e definimos a estrutura da tabela. Logo após a model instancia o método para criar a tabela