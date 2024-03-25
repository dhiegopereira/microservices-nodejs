const Docker = require('dockerode');

const dockerode = new Docker({ socketPath: '/var/run/docker.sock' });
// const dockerode = new Docker({ host: 'localhost', port: 2375 }); //fora do container

async function listarContainers() {
    try {
        const containers = await dockerode.listContainers({ all: true });
        const services = [];

        for (const containerInfo of containers) {
            const container = dockerode.getContainer(containerInfo.Id);
            const containerInspect = await container.inspect();

            if (containerInspect.State.Running) {
                services.push({
                    id: containerInspect.Id,
                    name: containerInspect.Name.replace('/', ''),
                    status: 'running',
                    ports: containerInspect.NetworkSettings.Ports
                });
            }
        }
        
        return services;
    } catch (error) {
        console.error('Erro ao listar os containers:', error);
        return [];
    }
}

setInterval(() => {
    listarContainers().then(services => {
        console.log('Status dos serviços:');
        console.table(services);
    }).catch(error => {
        console.error('Erro ao obter status dos serviços:', error);
    });
}, 5000);


module.exports = {
    dockerode,
    listarContainers
};
