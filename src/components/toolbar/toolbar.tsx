import * as React from "react";
import { connect } from 'react-redux'
import './toolbar.scss';

interface IToolbarProps {
    addNewSticker() : void,
    pingRedux() : void
}

class ToolBar extends React.Component<IToolbarProps> {
    public render (){
        return <div className="toolbar">
            <button className='create-window-button' onClick={this.props.addNewSticker}>Add window</button>
            <button className='create-window-button' onClick={this.props.pingRedux}>Action test</button>
        </div>
    }
}


export default connect(null, (dispatch) => {
    return {
        pingRedux: () => { console.log("1223") },
        addNewSticker: () => {
            dispatch({ type: "NEW_STICKER", payload: {} });
        }

    }
})(ToolBar)