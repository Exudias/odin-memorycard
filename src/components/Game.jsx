import { useState } from "react";
import "../styles/Game.css";
import Card from "./Card";
import shuffle from "../shuffle";

function Game({champions})
{
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [dummy, setDummy] = useState(0);

    const shuffledKeys = Object.keys(champions);
    shuffle(shuffledKeys);

    function addScore()
    {
        const newScore = score + 1;
        setScore(newScore);
        if (highScore < newScore)
        {
            setHighScore(newScore);
        }
    }

    function resetScore()
    {
        setScore(0);
        setDummy(dummy + 1);
    }

    return <div className="game">
        <ScoreContainer score={score} highScore={highScore}/>
        <GameContainer addScore={addScore} resetScore={resetScore} champions={champions} shuffledKeys={shuffledKeys}/>
    </div>
}

function ScoreContainer({score, highScore})
{
    return <div className="score-container">
        <span>Score: {score} | Best: {highScore}</span>
    </div>;
}

function GameContainer({addScore, resetScore, champions, shuffledKeys})
{
    const [selected, setSelected] = useState([]);

    if (selected.length == Object.keys(champions).length)
    {
        return <div className="victory-container">
            <h1>You win!</h1>
            <h2>Try again?</h2>
            <button onClick={() => {setSelected([]); resetScore();}}>Restart</button>
        </div>
    }

    function clickCard(id)
    {
        if (selected.includes(id))
        {
            setSelected([]);
            resetScore();
            return;
        }

        setSelected([...selected, id]);
        addScore();
    }

    return <div className="game-container">
        {shuffledKeys.map((key) => 
            <Card key={key} name={champions[key].name} id={key} onClick={() => clickCard(key)}/>
        )}
    </div>
}

export default Game;