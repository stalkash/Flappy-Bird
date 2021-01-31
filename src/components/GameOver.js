import React from "react";

import "../css/gameOver.css";
import TopGames from "./TopGames";
import {API_PATH} from "../constants";

class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areTopGamesVisible: false,
            playerName: ""
        }
        this.onChangeTopGamesVisible = this.onChangeTopGamesVisible.bind(this);
        this.onChangePlayerName = this.onChangePlayerName.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.saveGame = this.saveGame.bind(this);
    }

    onChangeTopGamesVisible(value) {
        this.setState({ areTopGamesVisible: value });
    }

    onChangePlayerName(event) {
        this.setState({ playerName: event.target.value })
    }

    saveGame() {
        fetch(`${API_PATH}/games`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playerName: this.state.playerName,
                    points: this.props.points
                })
            });
    }

    restartGame() {
        this.saveGame();
        document.location.reload();
    }

    render() {
        if (this.state.areTopGamesVisible) {
            return <TopGames/>;
        }

        return (
            <div id="gameOver">
                <div>Game Over!</div>
                <div><label htmlFor="playerName">Your name:</label><input id="playerName" type="text" onChange={this.onChangePlayerName}/></div>
                <button onClick={this.restartGame}>Restart</button>
                <button style={{ marginLeft: 10 }} onClick={() => {
                    this.saveGame();
                    this.onChangeTopGamesVisible(true);
                }}>Show last top games</button>
            </div>
        );
    }
}

export default GameOver;
