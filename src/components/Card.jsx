import "../styles/Card.css";

function Card({name, id, onClick})
{
    return <div className="card" onClick={onClick}>
        <div className="card-placeholder">
            <div className="card-image" style={{backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg)`}}/>
        </div>
        <h1>{name}</h1>
    </div>
}

export default Card;