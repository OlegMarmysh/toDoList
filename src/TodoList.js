import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";

class TodoList extends React.Component {
    nextTaskId= 0;
    state = {
        tasks: [
            /* {id: 0, title: 'CSS', isDone: true, priority: 'low'},
             {id: 1, title: 'HTML', isDone: true, priority: 'low'},
             {id: 2, title: 'React', isDone: false, priority: 'high'},
             {id: 3, title: 'JS', isDone: false, priority: 'high'}*/
        ],
        filterValue: 'All',
    }
    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All',
        }
        let stateAsString = localStorage.getItem('our-state' + this.props.id)
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
            state.tasks.forEach(t=>{
                if(t.id>=this.nextTaskId){
                    this.nextTaskId=t.id+1
                }
            })
        }

        this.setState(state);
    }

    componentDidMount() {
        this.restoreState();
    }

    addTask = (text) => {
        let newTask = {
            id: this.nextTaskId,
            title: text,
            isDone: false,
            priority: 'high'
        }

        this.nextTaskId++;
        this.setState(
            {
                tasks: [...this.state.tasks, newTask]
            },
            ()=>{this.saveState()}

        )
    }

    changeFilterValue = (filterValue) => {
        this.setState(
            {filterValue: filterValue},
            ()=>{this.saveState()}
        )
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj}
            }
        })
        this.setState(
            {tasks: newTasks},
            ()=>{this.saveState()}
        )
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('our-state' + this.props.id, stateAsString)
}
    render = () => {
        return (
                <div className="todoList">
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                    <TodoListTasks tasks={this.state.tasks.filter(task => {
                            if (this.state.filterValue === 'All') {
                                return task;
                            }
                            if (this.state.filterValue === 'Completed') {
                                return task.isDone === true;
                            }
                            if (this.state.filterValue === 'Active') {
                                return task.isDone === false;
                            }
                        }
                    )}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                    />
                    <TodoListFooter changeFilterValue={this.changeFilterValue} filterValue={this.state.filterValue}/>
                </div>
        );
    }
}

export default TodoList;

