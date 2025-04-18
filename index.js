const express = require('express');
const bodyParser = require('body-parser');
const handleIntent  = require('./webhookHandler');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const queryResult = req.body.queryResult;
    const intent = queryResult.intent.displayName;
    const parameters = queryResult.parameters;

    const response = handleIntent (intent, parameters);
    res.json(response);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
