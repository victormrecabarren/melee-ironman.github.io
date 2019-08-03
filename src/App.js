import React, { Component } from 'react'
import './App.css'
import Table from './components/Table'


let baseURL = `https://melee-ironman.herokuapp.com`


class App extends Component {
  state = {
    characters: [],
    secondColumn: [],
    playerOne: [],
    playerTwo: [],
    playerOneRemaining: [],
    playerTwoRemaining: []
  }

  componentDidMount() {
    this.getCharacters()

  }

  getCharacters = () => {
    fetch(baseURL + `/characters`)
    // .then(res => console.log(res))
    .then(response => response.json())
    .then(json => {
      let copy = [...json].reverse()
      this.setState({
      characters: json,
      secondColumn: copy,
      playerOne: json,
      playerTwo: copy,
      playerOneRemaining: json,
      playerTwoRemaining: copy
    })
  })
    .catch(error => console.log(error))
  }

  randomize = () => {
    let charactersCopy = [...this.state.characters]

    charactersCopy.sort(() => {
      return .5 - Math.random()
    })
    let randomized =     [...this.state.characters].sort(() => {
          return .5 - Math.random()
        })
      this.setState({
        characters: charactersCopy,
        secondColumn: randomized,
        playerOne: charactersCopy,
        secondColumn: randomized,
        playerOneRemaining: charactersCopy,
        playerTwoRemaining: randomized
      })
  }

  reorder = () => {
    let ordered = [...this.state.characters]

    ordered.sort((a,b) => {
        return a.trueIndex - b.trueIndex
    })

    let reverseOrder = [...ordered].reverse()

    this.setState({
      characters: ordered,
      secondColumn: reverseOrder,
      playerOne: ordered,
      playerTwo: reverseOrder,
      playerOneRemaining: ordered,
      playerTwoRemaining: reverseOrder
    })
  }

  dittos = () => {
    this.setState({
      secondColumn: this.state.characters,
      playerOne: this.state.characters,
      playerTwo: this.state.characters,
      playerOneRemaining: this.state.characters,
      playerTwoRemaining: this.state.characters,
    })
  }

  handleKill = (char, winner, loser) => {

    let losersRemaining = [...this.state[`${loser}Remaining`]]

    let winnersRemaining = [...this.state[`${winner}Remaining`]]

    let winnersStats = [...this.state[winner]]

    let losersStats = [...this.state[loser]]

    let winningIndex = winnersStats.findIndex((char) => char.id == winnersRemaining[0].id)

    let losingIndex = losersStats.findIndex((char) => char.id == losersRemaining[0].id)


    winnersRemaining[0].beat
    ? winnersStats[winningIndex].beat.push({
      name: char.name,
      icon: char.icon
    })
    : winnersStats[winningIndex].beat = [{
      name: char.name,
      icon: char.icon
    }]

    winnersRemaining[0].totalWins
    ? winnersStats[winningIndex].totalWins += 1
    : winnersStats[winningIndex].totalWins = 1


    losersRemaining[0].losses
    ? losersStats[losingIndex].losses.push({
      name: winnersRemaining[0].name, icon: winnersRemaining[0].icon
    })
    : losersStats[losingIndex].losses = [{
      name: winnersRemaining[0].name,
      icon: winnersRemaining[0].icon
    }]

    if (losersStats[losingIndex].losses.length === 2){
      losersRemaining.shift()
    }


    this.setState({
      [winner]: winnersStats,
      [loser]: losersStats,
      [`${winner}Remaining`]: winnersRemaining,
      [`${loser}Remaining`]: losersRemaining
    })


  }


  render() {
    return (
      <div className="App">
        <Table
          characters={this.state.characters}
          secondColumn={this.state.secondColumn}
          randomize = {this.randomize}
          reorder = {this.reorder}
          dittos = {this.dittos}
          handleKill = {this.handleKill}

        />
      </div>
    )
  }
}

export default App
