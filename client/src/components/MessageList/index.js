import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'

class MessageList extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <ListGroup>
          {
            this.props.messages.map((el) => 
              <ListGroupItem>
                <h5>{el.name}</h5>
                <p>{el.message}</p>
                <p>{el.time.toLocaleString()}</p>
              </ListGroupItem>
            )
          }
        </ListGroup>
      </div>
    );
  }
}

export default MessageList