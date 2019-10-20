import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {
    state = {
        todoLists: [
            /*{id: 1, title: 'What to learn?'},
            {id: 2, title: 'Week tasks?'},
            {id: 3, title: 'Year tasks?'},*/
        ]
    }
    newTitleId=0;

    restoreState = () => {
        let state = {
            todoLists: [],
        }
        let stateAsString = localStorage.getItem('our-stateTitle');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
            state.todoLists.forEach(t=>{
                if(t.id>=this.newTitleId){
                this.newTitleId=t.id+1
            }
            })
    }
        this.setState(state)
    }
    componentDidMount() {
        this.restoreState();
    }
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-stateTitle', stateAsString)
    }
    addTodoList = (title) => {
        let newTitle={
            id: this.newTitleId,
            title: title
        }
        this.newTitleId++;
        this.setState(
            {todoLists: [...this.state.todoLists, newTitle]},
            ()=>{this.saveState()}
        )
    };

    render = () => {
        const todoLists = this.state.todoLists.map(tl => <TodoList id={tl.id} title={tl.title}/>)
        return (
            <div>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className='App'>
                    {todoLists}
                </div>
            </div>

        )
    }
}

export default App;

