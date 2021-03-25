import React, {Component} from 'react'
import './search-panel.css'

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textToFilter: ''
        }
    }

    onUpdateSearch = (event) => {
        const textToFilter = event.target.value;
        this.setState({textToFilter})
        this.props.onUpdateSearch(textToFilter)
    }

    render() {
        return (
            <input
                onChange={this.onUpdateSearch}
                className='form-control search-input'
                type='text'
                placeholder='Поиск по записям'
            />
        )
    }
}

