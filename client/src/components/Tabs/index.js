import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ContactList from '../ContactList'
import MessageList from '../MessageList'

class TabsCustom extends Component {
  constructor (props) {
    super(props)
    this.setMessages = this.setMessages.bind(this)
    this.state = {
      messages: []
    }
  }

  setMessages (message) {
    const messages = this.state.messages
    messages.splice(0, 0, message)
    this.setState({messages})
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Contacts">
          <ContactList setMessages={this.setMessages.bind(this)}/>
        </Tab>
        <Tab eventKey={2} title="Messages">
          <MessageList messages={this.state.messages}/>
        </Tab>
      </Tabs>
    )
  }
}

export default TabsCustom