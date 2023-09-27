// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Swal from 'sweetalert2'


class App extends Component {
  constructor(props) {
    super(props);



    // Setting up state
    this.state = {
      userInput: "",
      list: [],
    };
  }



  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }



  // Add item if user input in not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),



        // Add a user value to list
        value: this.state.userInput,
      };



      // Update list
      const list = [...this.state.list];
      list.push(userInput);



      // reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }



  // Function to delete item from list use id to delete
  deleteItem = async (key) => {
    await Swal.fire({
      title: 'Chắc chưa?',
      text: "Xóa là mất đấy!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, perform the delete action here
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
          list: updateList,
        });
      }
    });
  }




  editItem = async (index) => {
    const todos = [...this.state.list];

    await Swal.fire({
      title: 'Chỉnh sửa công việc',
      input: 'text',
      inputValue: todos[index].value,
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const editedTodo = result.value;
        if (editedTodo !== null && editedTodo.trim() !== '') {
          let updatedTodos = [...todos];
          updatedTodos[index].value = editedTodo;
          this.setState({
            list: updatedTodos
          });
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
        </Row>



        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="add item . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(item) =>
                  this.updateInput(item.target.value)
                }
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  variant="dark"
                  className="mt-2"
                  onClick={() => this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.list.map((item, index) => {
                return (
                  <div key={index} >
                    <ListGroup.Item
                      variant="dark"
                      action
                      style={{
                        display: "flex",
                        justifyContent: 'space-between'
                      }}
                    >
                      {item.value}
                      <span>
                        <Button style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={() => this.deleteItem(item.id)}>
                          Delete
                        </Button>
                        <Button variant="light"
                          onClick={() => this.editItem(index)}>
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}



export default App;