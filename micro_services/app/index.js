const app = require('./src/server');
const seneca = require('./src/seneca');

app.listen(8080, () => {
    console.log('Servidor HTTP rodando na porta 8080');
});
