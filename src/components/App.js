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
   handleFilterChange= (e) => {
    this.setState({
      filters: { 
        ...this.state.filters, 
        type: e.target.value}
    })
  }
  handleFindPets= () => {
    let url = '/api/pets'
    if( this.state.filters.type !== "all" ){
       url = url+`?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(res => res.json())
    .then(pets => this.setState({pets : pets}))
  }

 onAdoptPet= (id) => {
           let petsCopyState = [...this.state.pets]
            const thePet =   petsCopyState.find( pet => pet.id === id)
            thePet.isAdopted = true
            this.setState(
              {
                pets: petsCopyState
              }
            )
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
                onChangeType={this.handleFilterChange}
                onFindPetsClick={this.handleFindPets}
              />
            </div>
            <div className="twelve wide column">
               <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
