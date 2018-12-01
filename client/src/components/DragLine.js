import React, { Component } from 'react'
export default class DragLine extends Component {
    constructor(props) {
        super(props);
        this.state={
            isResizing : false,
            lastDownX : 0
        }
    }
    startDrag = (e) =>{
        document.addEventListener("mousemove",this.drag)
        document.addEventListener("mouseup", this.endDrag)
        console.log(e.clientX);
        this.setState({
            isResizing : true,
            lastDownX : e.clientX
        })
    }
    drag = (e) =>{
        
        if (!this.state.isResizing)
        return;
        let offsetRight = this.view.clientWidth - (e.clientX - this.view.offsetLeft)
        this.leftPanel.style.right = ` ${offsetRight}px`
        this.rightPanel.style.width = `${offsetRight}px`
    }
    endDrag = (e) =>{
        this.setState({
            isResizing : false
        })
        document.removeEventListener("mousemove",this.drag)
        document.removeEventListener("mouseup", this.endDrag)
    }
    
    componentDidMount = () => {
        this.view = document.querySelector('#split_view')
        this.leftPanel = document.querySelector('#left_panel')
        this.rightPanel = document.querySelector('#right_panel')
        this.dragLine = document.querySelector('#drag')
        
        this.dragLine.addEventListener("mousedown", this.startDrag)
    }
    
    
    render() {
        return (
            <div id="drag" ></div>
        )
    }
}
// var isResizing = false,
//     lastDownX = 0;

// $(function () {
//     var container = $('#container'),
//         left = $('#left_panel'),
//         right = $('#right_panel'),
//         handle = $('#drag');

//     handle.on('mousedown', function (e) {
//         isResizing = true;
//         lastDownX = e.clientX;
//     });

//     $(document).on('mousemove', function (e) {
//         // we don't want to do anything if we aren't resizing.
//         if (!isResizing)
//             return;

//         var offsetRight = container.width() - (e.clientX - container.offset().left);

//         left.css('right', offsetRight);
//         right.css('width', offsetRight);
//     }).on('mouseup', function (e) {
//         // stop resizing
//         isResizing = false;
//     });
// });