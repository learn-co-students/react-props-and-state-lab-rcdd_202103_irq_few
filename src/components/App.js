import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (type) => {
    this.setState({
      ...this.state,
      filters: {
        type,
      }
    })
  }

  findPets = () => {
    let api = '/api/pets'
    const type = this.state.filters.type
    if (type !== 'all')
      api += `?type=${type}`

    fetch(api)
      .then(response => response.json())
      .then(json => this.setState({
        ...this.state,
        pets: json,
      }))
      .then(() => console.log(this.state.pets[0]))
  }

  adoptPet = (id) => {
    this.setState(prevState => {
      return {
        ...prevState,
        pets: prevState.pets.map(pet => {
          if (pet.id === id)
            pet.isAdopted = true
          return pet
        })
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
                />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.adoptPet}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App