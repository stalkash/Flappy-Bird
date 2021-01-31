import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {Game} from "./entity/Game";
import { format } from 'date-fns'

const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const connection = createConnection();

app.get("/games", (req, res) => {
    connection.then(async connection => {
        const games = await connection.manager.find(Game);
        res.json(games);
    }).catch(error => console.log(error));
});
app.post("/games", (req, res) => {
    connection.then(async connection => {
       const {playerName, points} = req.body;
       const createDto = new Game();
       createDto.playerName = playerName;
       createDto.scorePoints = points;
       createDto.utcDate = format(new Date(), "dd-MM-yyyy HH:mm");
       await connection.manager.save(createDto)
           .then((createdGame) => {
               console.log(`Game was created. ID: ${createdGame.id}`);
           })
           .catch((error) => {
               console.log(error);
           });
       res.json(true);
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
