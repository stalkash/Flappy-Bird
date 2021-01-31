import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("game", {
    orderBy: {
        scorePoints: "DESC"
    }
})
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playerName: string;

    @Column()
    scorePoints: number;

    @Column()
    utcDate: string;

}
