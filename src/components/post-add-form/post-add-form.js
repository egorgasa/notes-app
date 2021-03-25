import React, {Component} from 'react';
import './post-add-form.css'

export default class PostAddForm extends Component {

    render() {
   
        return (
            <form
                onSubmit={this.props.onSubmit}
                className='bottom-panel d-flex'>
                <input
                    onChange={(event)=>{this.props.onValueChangeText(event.target.value)}}
                    type='text'
                    placeholder='о чем вы сейчас думаете'
                    className='form-control new-post-label'
                    value={this.props.text}/>
                <button
                    type='submit'
                    className='btn btn-outline-secondary'>
                    Отправить
                </button>
            </form>
        )
    }
}

