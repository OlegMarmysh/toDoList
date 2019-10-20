import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    state = {
        opacity: true,
        editMode: false
    }
    activeEditMode = () => {
        this.setState(
            {editMode: true}
        )
    }
    deactivateEditMode = () => {
        this.setState(
            {editMode: false}
        )
    }
    changeStatus = (e) => {
        this.props.changeStatus(this.props.tasks.id, e.currentTarget.checked)
    }
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.tasks.id, e.currentTarget.value)
    }
    render = () => {
        let classForOpacity=this.props.tasks.isDone=== true ? 'done' : 'todoList-task'
        return (
            <div className={classForOpacity}>
                <input type="checkbox"  checked={this.props.tasks.isDone} onChange={this.changeStatus}/>
                {this.state.editMode ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.props.tasks.title}/> :<span onClick={this.activeEditMode}>{this.props.tasks.id} - {this.props.tasks.title}</span>},
                 priority: {this.props.tasks.priority}
            </div>
        );
    }
}

export default TodoListTask;

