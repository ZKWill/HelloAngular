const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const produtosRoutes = require('./routes/produtos');

app.use(cors());
app.use(bodyParser.json());

app.use('/produtos', produtosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});