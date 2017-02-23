import React, { Component } from 'react'
import { Connect } from 'uport-connect'
import logo from './logo.svg'
import './App.css'

const uport = new Connect('MyDApp')

class App extends Component {

  constructor (props) {
    super(props)
    this.btnClick = this.btnClick.bind(this)
    this.loginBtn = this.loginBtn.bind(this)
    this.state = { state1: 0 }
  }

  componentWillMount () {
    console.log('Next Step ---> Component is planning to mount on the page - we could do something here before that')
    console.log('state', this.state)
  }
  componentWillReceiveProps () {
    console.log('Next Step ---> Component is planning on populating the componenet with data - we could do something here before that')
  }
  shouldComponentUpdate () {
    console.log('Next Step ---> Component has some new data - here is where you can put conditions for if it should re-render')
    return true
  }
  componentWillUpdate () {
    console.log('Next Step ---> Component has decieded that it will update')
  }

  btnClick () {
    this.setState({
      state1: this.state.state1 + 1
    })
  }
  loginBtn () {
    var thisComponent = this

    uport.requestCredentials().then((credentials) => {
      console.log({uport: credentials})

      thisComponent.setState({
        uport: credentials
      })
    })
  }

  render () {
    console.log('Next Step ---> Componet will now render in memory to prepare for being mounted or updated')
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
          <div>

            {
              this.state.state1 >= 3
                ? (
                  <button
                    style={{cursor: 'pointer', fontSize: '20px', backgroundColor: 'blue', color: 'white'}}
                    onClick={() => this.loginBtn()}
                    className='btn btn-primary btn-md ml-auto p-2'>Login</button>
                )
                : null
            }

            <br />

            {
              this.state.uport
                ? <img alt={'uport'} src={'https://ipfs.infura.io/' + this.state.uport.image.contentUrl} />
                : null
            }

            <button
              style={{cursor: 'pointer', fontSize: '20px', backgroundColor: 'blue', color: 'white'}}
              onClick={() => this.btnClick()}
              className='btn btn-primary btn-md ml-auto p-2'>Increment State: +1</button>
            <br />
            <span style={{fontSize: '40px'}}>State: </span>
            <span style={{fontSize: '40px', color: 'lightgreen', fontWeight: 'bold'}}>{this.state.state1}</span>

          </div>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
  componentDidMount () {
    console.log('Next Step ---> Componet was rendered and mounted on the page')
    console.log('------------------------------------------------------------')
  }
  componentDidUpdate () {
    console.log('state', this.state)
    console.log('Next Step ---> Component on the page has now been updated')
  }
  componentWillUnmount () {
    console.log('Next Step ---> Component is going to go away now')
  }
}

export default App
