import React, {Component} from 'react';

export default class TegListItem extends Component {
    render(){
        const {teg,deleteTeg}=this.props;
        return(
            <div>
                <span>{teg}</span>
                <button
                        type="button"
                        className="btn-trash btn-sm"
                        onClick={deleteTeg}>
                        <i className="fa fa-trash-o"></i>
                    </button>
            </div>
        )
    }
}