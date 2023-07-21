import './index.css'

const TravelCard = props => {
  const {details} = props
  const {name, imageUrl, description} = details
  console.log(details)
  return (
    <div>
      <li className="item">
        <img src={imageUrl} alt={name} className="image1" />
        <h1 className="title2">{name}</h1>
        <p className="para">{description}</p>
      </li>
    </div>
  )
}

export default TravelCard
