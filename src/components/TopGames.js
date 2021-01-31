import React from "react";

import "../css/topGames.css";
import {API_PATH} from "../constants";

class TopGames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topGames: []
        };
        this.fetchTopGames = this.fetchTopGames.bind(this);
    }

    fetchTopGames() {
        fetch(`${API_PATH}/games`)
            .then(response => response.json())
            .then(games => this.setState({ topGames: games }))
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.fetchTopGames();
    }

    render() {
        return  (
            <div id="topGames">
                <table>
                    <tr>
                        <th>Player name</th>
                        <th>Points</th>
                        <th>Date</th>
                    </tr>
                    {
                        this.state.topGames.map(game => {
                          return (
                            <tr>
                                <td>{game.playerName}</td>
                                <td>{game.scorePoints}</td>
                                <td>{game.utcDate}</td>
                            </tr>
                          );
                        })
                    }
                </table>
                <button style={{ marginTop: 10, left: 0 }} onClick={() => document.location.reload()}>Restart game</button>
            </div>
        );
    }
}

export default TopGames;
