import './card.css';

function Card () {
    return (
        <div className='card-container'>
            <div className='img-container'>
                <img src="" alt="" />
            </div>

            <div>
                <h2></h2>
                <p></p>
                <div className='card-button-cont'>
                    <button>View Board</button>
                    <button>Delete Board</button>
                </div>
            </div>
        </div>
    )
}

export default Card
