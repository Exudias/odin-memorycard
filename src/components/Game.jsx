import { useState } from "react";
import "../styles/Game.css";
import Card from "./Card";
import { STORAGE_CHAMPIONS_KEY } from '../constants';

function Game()
{
    return <div className="game">
        <ScoreContainer/>
        <GameContainer/>
    </div>
}

function ScoreContainer()
{
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    return <div className="score-container">
        <span>Score: {score}</span>
        <span>Best: {highScore}</span>
    </div>;
}

function GameContainer()
{
    const champions = JSON.parse(sessionStorage.getItem(STORAGE_CHAMPIONS_KEY));

    return <div className="game-container">
        {Object.keys(champions.data).map((key) => 
            <Card key={key} name={champions.data[key].name} id={champions.data[key].id}/>
        )}
    </div>
}

export default Game;