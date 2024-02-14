import './Card.css';

function Card({ link, title, text }) {
    return (
      <div className='card' onClick={() => window.open(link, '_blank')}>
        <h3 className='card-title'>{title}</h3>
        <p className='card-text'>{text.split('\n').slice(0, 3).join('\n')}</p>
      </div>
    );
  }

export default Card;