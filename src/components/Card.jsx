function Card({name, id})
{
    return <div className="card">
        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`}></img>
        <h1>{name}</h1>
    </div>
}

export default Card;