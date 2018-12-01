import React from 'react';
import Search from './Search'
import DragLine from './DragLine'


export default (props) => {
    return (
        <div>
            <DragLine id="drag" />
            <div className="row">
                <Search />
            </div>
            <div className="row">
                {props.children}
            </div>
        </div>
    )
}
