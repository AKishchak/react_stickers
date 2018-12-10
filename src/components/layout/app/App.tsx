import autobind from 'autobind-decorator'
import * as React from 'react';
import StickerContainer from "../../stickerContainer/StickerContainer";
import ToolBar from "../../toolbar/toolbar";
import './App.css';

@autobind
export default class App extends React.Component{

    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <div className="App">
                <ToolBar/>
                <StickerContainer/>
            </div>
        );
    }
}
