import React, { Component } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'

import {
  postData
} from '../../lib'

class MessageList extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleShow = this.handleShow.bind(this)
    this.handleShowEntry = this.handleShowEntry.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCloseEntry = this.handleCloseEntry.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.setMessages = this.props.setMessages.bind(this)
    this.handleContact = this.handleContact.bind(this)
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
      showEntry: false,
      selectedContact: {},
      value: '',
      otp: '='
    }
  }
  
  handleClose() {
    this.setState({ show: false });
  }

  handleCloseEntry() {
    this.setState({ showEntry: false });
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

  handleContact() {
    const contacts = this.state.contacts

    contacts.push({
      name: this.state.valueName,
      number: this.state.valueNumber,
      showEntry: false
    })

    this.setState({contacts})
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

  handleShowEntry(el) {
    this.setState({
      showEntry: true
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

  handleChangeName(e) {
    this.setState({ valueName: e.target.value });
  }

  handleChangeNumber(e) {
    this.setState({ valueNumber: e.target.value });
  }

  render() {
    return (
      <div>
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
        <Button onClick={this.handleShowEntry}>Add a contact</Button>
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
        <Modal show={this.state.showEntry} onHide={this.handleCloseEntry}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedContact.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
              >
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.valueName}
                  placeholder="Enter text"
                  onChange={this.handleChangeName}
                />
                <ControlLabel>Number</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.valueNumber}
                  placeholder="Enter Number"
                  onChange={this.handleChangeNumber}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleContact}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default MessageList