import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from './Components/TravelCard'
import './App.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

// Replace your code here
class App extends Component {
  state = {travelData: [], apiStatus: initialApiStatus.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: initialApiStatus.loading})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      console.log(updatedData)
      this.setState({
        travelData: updatedData,
        apiStatus: initialApiStatus.success,
      })
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getSuccessView = () => {
    const {travelData} = this.state
    return (
      <ul className="successCard">
        {travelData.map(each => (
          <TravelCard key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  getApiStatus = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case initialApiStatus.loading:
        return this.getLoadingView()

      case initialApiStatus.success:
        return this.getSuccessView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgContainer">
        <h1 className="title">Travel Guide</h1>
        {this.getApiStatus()}
      </div>
    )
  }
}

export default App
