import React from 'react';
import './App.css';

class ToDo extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ToDos: [],
      check: false,
      index: '',
      strike: 'none'
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  add(event){
    event.preventDefault();
    let title = this.refs.notes.value;
    let res_value ={
      title: this.refs.notes.value,
      isChecked: false
    }
    if(localStorage.getItem('ToDos') == null){
      var ToDos = [];
      ToDos.push(res_value);
      localStorage.setItem('ToDos', JSON.stringify(ToDos));
      this.refs.todoForm.reset();
    }else{
      var ToDos = JSON.parse(localStorage.getItem('ToDos'));
      ToDos.push(res_value);
      localStorage.setItem('ToDos', JSON.stringify(ToDos));
      this.refs.todoForm.reset();
    }
    
  }

  view(event){
    event.preventDefault();
    var newList = JSON.parse(localStorage.getItem('ToDos'))
    this.setState({
      ToDos: newList,
    });
    this.refs.todoForm.reset();
  }

  delete(e) {
    e.preventDefault();
    var index_del = e.target.getAttribute('data-key');
      var list = JSON.parse(localStorage.getItem('ToDos'));
      list.splice(index_del,1);
      this.setState({
        ToDos: list
      });
      localStorage.setItem('ToDos', JSON.stringify(list));
  }

  edit(e){
    e.preventDefault();
    var index = e.target.getAttribute('data-key');
    var edit_list = JSON.parse(localStorage.getItem('ToDos'));
    
    this.setState({
      ToDos: edit_list,
      index: index,
      check: true
    });
    localStorage.setItem('ToDos', JSON.stringify(edit_list));
  }

  update(e){
    e.preventDefault();
    const {index} = this.state; 
    let updatedTitle = this.refs.updatedNotes.value;
    let update_list = JSON.parse(localStorage.getItem('ToDos'));
    update_list[index].title = updatedTitle; 
    this.setState({
      check: false,
    });
    localStorage.setItem('ToDos', JSON.stringify(update_list));
    this.refs.todoForm.reset();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onCheck( event){ 
    // event.preventDefault();
    let itemName = event.target.name;
    let checked = event.target.checked;
    this.setState(prevState =>{
      let { ToDos } = prevState;
      
        ToDos = ToDos.map(item =>
          item.title === itemName ? { ...item, isChecked: checked } : item
        );
        localStorage.setItem('ToDos', JSON.stringify(ToDos))
      return { ToDos };
    });
  }

  render(){
    let index = this.state.index;
    return(
      <div className="container-fluid">
        <div className="heading text-center">
          <h1>To-Do Application</h1>
        </div>
        <form ref="todoForm">
          <div className="text-center">
            {
              this.state.check == false ? 
              <div>
                <input type="text" placeholder=" Notes.." className="input-box" name="notes-title" ref="notes" />
                <button value="add" className="btn btn-primary" onClick={this.add.bind(this)}>Add Task</button>
                <button value="view" className="btn btn-success" onClick={this.view.bind(this)}>View</button>
              </div>:
              <div>
                <input type="text" className="edit-inputBox" ref="updatedNotes" defaultValue={this.state.ToDos[index].title} onChange={this.handleChange} />
                <button value="edit" className="btn btn-success fa-edit" onClick={this.update.bind(this)}>Edited Task</button>
                <button value="view" className="btn btn-success fa-view" onClick={this.view.bind(this)}>View</button>
              </div>
            }
            {this.state.ToDos && this.state.ToDos.length ?
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Task Done</th>
                        <th>List Of Item</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ToDos.map((todo, index) =>
                        <tr key={index}>
                          <td className="form-check checkbox">
                            <input 
                                type="checkbox" 
                                data-key={index} 
                                id="myCheckNew" 
                                name={todo.title}
                                checked={todo.isChecked}
                                // onClick={this.onCheck.bind(this)} 
                                onChange={this.onCheck}
                            />
                          </td>
                          <td>
                            <label className= {todo.isChecked == true ? "textDecoration" : ""}>{todo.title}</label>
                          </td>
                          <td>
                            <button value="edit" onClick={this.edit.bind(this)} className="btn btn-success" data-key={index}>Edit</button>
                            <button value="delete" onClick={this.delete.bind(this)} className="btn btn-danger" data-key={index}>Delete</button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  : <h2 className="list-available">Click on the View Button to view the list of Notes..</h2>
                }
          </div>
        </form>
      </div>
    )}
}

export default ToDo;
