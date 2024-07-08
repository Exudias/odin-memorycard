import { useEffect, useState } from "react";
import "../styles/Game.css";
import Card from "./Card";
import shuffle from "../shuffle";
import { DIFFICULTIES } from "../constants";

function Game({champions, difficulty})
{
    const [score, setScore] = useState(0);
    const [highScores, setHighScores] = useState({});
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        setScore(0);
    }, [difficulty]);

    const shuffledKeys = Object.keys(champions);
    shuffle(shuffledKeys);

    const currentHighScore = highScores[difficulty] ?? 0;
    
    function addScore()
    {
        const newScore = score + 1;
        setScore(newScore);
        if (currentHighScore < newScore)
        {
            const newHighScores = {...highScores};
            newHighScores[difficulty] = newScore;
            setHighScores(newHighScores);
        }
    }

    function resetScore()
    {
        setScore(0);
        setDummy(dummy + 1);
    }

    return <div className="game">
        <ScoreContainer score={score} highScore={currentHighScore} difficulty={difficulty}/>
        <GameContainer addScore={addScore} resetScore={resetScore} champions={champions} shuffledKeys={shuffledKeys}/>
    </div>
}

function ScoreContainer({score, highScore, difficulty})
{
    return <div className="score-container">
        <span>Score: {score} | Best: {highScore} ({DIFFICULTIES[difficulty].name})</span>
    </div>;
}

function GameContainer({addScore, resetScore, champions, shuffledKeys})
{
    const [selected, setSelected] = useState([]);

    if (selected.length == Object.keys(champions).length)
    {
        return <div className="victory-container">
            <h1>You win!</h1>
            <h2>Feel free to try again or select a higher difficulty!</h2>
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