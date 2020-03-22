import React, { Component } from 'react'

function importAll(r) {
  let images = {}
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); })
  return images
}

const images = importAll(require.context('../icons', false, /\.(png|jpe?g|svg)$/))

let winnerObject = {}
for (let i=1; i<=26; i++) {
  winnerObject[i] = ''
}


class Table extends Component {
  state = {
    playerOneName: 'Player One',
    playerTwoName: 'Player 2',
    winner: winnerObject,
    playerOne: [],
    playerTwo: [],
  }

  lostStock(event, char, winner, loser) {

    //dim or undim the icon
    if (event.target.classList.contains('clicked')) {
      event.target.classList.remove('clicked')
    } else {
      event.target.classList.add('clicked')
      this.props.handleKill(char, winner, loser)
    }

    //
    console.log(winner, "wins");

    let playerWins = [...this.state[winner]]
    playerWins.push(char)

    this.setState({
      [winner]: playerWins
    })



  }



  render() {

    return(

      <>
      <button className='btn btn-warning'
        onClick={() => {
          this.props.dittos()
        }}>Dittos</button>
      <table className='table table-hover'>
        <thead>
          <tr className='sticky-top'>
            <th
              onClick={() => {
                this.props.randomize()
              }}
              scope="col"
              className='sticky-top'
              ><button className="btn btn-success">Randomize!</button></th>
            <th
              scope="col"
              className='sticky-top'
              >{this.state.playerOneName}</th>
            <th
              scope="col"
              className='sticky-top'
              >{this.state.playerTwoName}</th>
            <th
              scope="col"
              className='sticky-top'
              ><button
                className='btn btn-danger'
                onClick={() => {
                  this.props.reorder()
                }}
                >Reorder</button></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.characters.map((char, i) => { return(
              <tr key={char.id}>
              <th scope='row'>{i+1}</th>
              <td>
                <img
                  className='icon'
                  src={images[char.icon]}
                  alt={char.name}
                  onClick={(event) => {
                    this.lostStock(event, char, 'playerTwo', 'playerOne')
                  }}
                />
                <img
                  className='icon'
                  src={images[char.icon]}
                  alt={char.name}
                  onClick={(event) => {
                    this.lostStock(event, char, 'playerTwo', 'playerOne')
                  }}
                />
              </td>
              <td>
                <img
                  className='icon'
                  src={images[this.props.secondColumn[i].icon]}
                  alt={this.props.secondColumn[i].name}
                  onClick={(event) => {
                    this.lostStock(event, this.props.secondColumn[i], 'playerOne', 'playerTwo')
                  }}
                />
                <img
                  className='icon'
                  src={images[this.props.secondColumn[i].icon]}
                  alt={this.props.secondColumn[i].name}
                  onClick={(event) => {
                    this.lostStock(event, this.props.secondColumn[i], 'playerOne', 'playerTwo')
                  }}
                />
              </td>
              <td>
                {
                  this.state.winner[i]
                    ? <img
                      src={images[this.state.winner[i]]}
                      alt={char.name}
                      />
                    : null
                }
              </td>
            </tr>
            )})
          }

        </tbody>
      </table>



    </>
    )
  }
}

export default Table
