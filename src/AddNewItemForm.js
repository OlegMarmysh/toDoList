import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {
    state = {
        error: '',
        title: ''
}

    render = () => {
        let classForRed=this.state.error=== true ? 'error' : ''
        let onAddItem = () => {
            let newText = this.state.title;
            if(newText === ''){
                this.setState({error: true})
            }else{
                this.setState({error: false})
                this.props.addItem(newText)
            }
            this.state.title='';
        }
        let onItemTitleChange = (e) => {
            this.setState(
                {
                    title: e.currentTarget.value,
                    error: false
                }
            )
        }
        let onKeyPressInput = (e) => {
              if(e.key==='Enter'){
                  onAddItem()
              }
        }
        return (
                <div className="todoList-newItemForm">
                    <input
                        type="text"
                        placeholder="New item name"
                        className={classForRed}
                        onChange={onItemTitleChange}
                        onKeyPress={onKeyPressInput}
                        value={this.state.title}
                    />
                    <button onClick={onAddItem}>Add</button>
                </div>
        );
    }
}

export default AddNewItemForm;

