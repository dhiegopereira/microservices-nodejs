const Seneca = require('seneca');
const { dockerode, listarContainers } = require('./dockerode');

const seneca = Seneca();

seneca.add({ role: 'api', action: 'status' }, async (msg, reply) => {
    try {
        const services = await listarContainers();
        reply(null, services);
    } catch (error) {
        console.error('Erro:', error);
        reply(error);
    }
});

seneca.add({ role: 'api', action: 'start' }, async (msg, reply) => {
    try {
        const { serviceName } = msg;
        const container = dockerode.getContainer(serviceName);
        await container.start();
        reply(null, { message: `Serviço ${serviceName} iniciado` });
    } catch (error) {
        console.error('Erro:', error);
        reply(error);
    }
});

seneca.add({ role: 'api', action: 'stop' }, async (msg, reply) => {
    try {
        const { serviceName } = msg;
        const container = dockerode.getContainer(serviceName);
        await container.stop();
        reply(null, { message: `Serviço ${serviceName} parado` });
    } catch (error) {
        console.error('Erro:', error);
        reply(error);
    }
});

module.exports = seneca;
