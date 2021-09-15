import express  from "express";
import router from "./Routes";
import "reflect-metadata";
import "./database/conection";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./swagger/swagger.json";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(router);

app.listen(3001, () => console.log('server started localhost:3001'));