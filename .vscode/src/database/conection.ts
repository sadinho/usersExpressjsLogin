import { createConnection } from "typeorm";

createConnection().then(() => console.log('sucess conect database'));