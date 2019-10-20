import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements = this.props.tasks.map(task => <TodoListTask
           tasks={task}
           changeStatus={this.props.changeStatus}
           changeTitle={this.props.changeTitle}
        />)
        return (
            <div className="todoList-task">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

