import * as mockttp from 'mockttp';
import { join } from 'path';

const port = 4567;

(async () => {
    const server = mockttp.getLocal();
    
    server.post("/v1/oauth2/token").thenFromFile(200, join(__dirname, "./requests/possua_cadastro/login_response.json"));
    server.post("/v1/userprofile").thenFromFile(200, join(__dirname, "./requests/possua_cadastro/user_response.json"));
    
    await server.start(port);

    server.on('request', (request) => {
        console.log(`receveid request on ${request.url}`);
    });
    
    console.log(`Server running on port ${server.port}`);
})();