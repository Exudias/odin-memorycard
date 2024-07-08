import "../styles/Help.css"
import "/help-circle.svg"

function Help()
{
    return <div className="help-button">
        <img src="/help-circle.svg"/>
        <div className="help-div">
            To play, you must click on every card only once.
            If you click on a card a second time, you lose and your score is reset.
        </div>
    </div>
}

export default Help;