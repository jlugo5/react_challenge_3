import React from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'

import './message.css'


class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      open: false
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => {
      // Included to support initial direction. Please remove upon completion
      console.log(messages)
      if(message.priority === 1)
        alert("Error Message")
    })
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  handleClear = (msg) => {
    const {messages} = this.state
    this.setState(
      {messages: messages.filter( message => message.message !== msg)}
    )
  }

  render() {
    const isApiStarted = this.api.isStarted()
    const {messages} = this.state
    return (
      <div className='messages'>
        <Button
          variant="contained"
          onClick={this.handleClick}
        >
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </Button>
        
        <div className='message-table'>
        <div className='message-row'>
          {
            messages.map( message => 
            (message.priority === 1)?
            <div className='error-message' onClick={() => this.handleClear(message.message)}>{message.message}</div>
            :'')
          }
        </div>
        <div className='message-row'>
          {
            messages.map( message => 
            (message.priority === 2)?
            <div className='warning-message'  onClick={() => this.handleClear(message.message)}>{message.message}</div>
            :'')
          }
        </div>
        <div className='message-row'>
          {
            messages.map( message => 
            (message.priority === 3)?
            <div className='info-message'  onClick={() => this.handleClear(message.message)}>{message.message}</div>
            :'')
          }
        </div>
        </div>
        
      </div>
      
    )
  }
}

export default MessageList
