import React, { Component } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Modal,
  Popover,
  Tooltip,
  OverlayTrigger,
  Button,
  FieldGroup,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'

import {
  postData
} from '../../lib'

class MessageList extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.setMessages = this.props.setMessages.bind(this)
    this.state = {
      contacts: [
        {
          name: 'Debayan',
          number: 8768233007
        },
        {
          name: 'Sayan',
          number: 7407817206
        }
      ],
      show: false,
      selectedContact: {},
      value: '',
      otp: '='
    }
  }
  
  handleClose() {
    this.setState({ show: false });
  }

  componentDidMount() {
    fetch(`/send`)//, {test: true})
      .then(data => {
        // this.state.otp = 'data.otp'
        this.setState({
          otp: true
        })
      })
      .catch(error => console.error(error));
  }

  handleMessage() {
    this.setState({
      show: false,
      value: ''
    })
    this.setMessages({
      name: this.state.selectedContact.name,
      message: this.state.value,
      time: new Date()
    })
    fetch(`/send?otp=${this.state.otp}&number=${this.state.selectedContact.number}`)//, {test: true})
      .then(data => {
        // this.state.otp = 'data.otp'
        this.setState({
          otp: true
        })
      })
      .catch(error => console.error(error));
  }

  handleShow(el) {
    const otp = Math.floor(Math.random() * 1000000)
    this.setState({
      show: true,
      selectedContact: el,
      otp,
      value: `Hi. Your OTP is: ${otp}`
    })
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length >= 50) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <p>{this.state.otp}</p>
        <ListGroup>
          {
            this.state.contacts.map((el) => 
              <ListGroupItem onClick={this.handleShow.bind(null, el)}>
                <h4>{el.name}</h4>
                <p>{el.number}</p>
              </ListGroupItem>
            )
          }
        </ListGroup>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedContact.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
              >
                <ControlLabel>Enter your message</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleMessage}>Send</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default MessageList