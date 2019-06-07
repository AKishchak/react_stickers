import autobind from 'autobind-decorator'
import * as React from 'react';
//    import StickerContainer from "../../stickers/stickers";
import ToolBar from "../../toolbar/toolbar";
import './Main.css';
import Navbar from "../navbar/navbar";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    background: background-color: #c8ebf6;
`;

@autobind
export default class Main extends React.Component{

    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <Wrapper className="App">
                <div>
                    <Navbar/>
                </div>
                <div>
                    <ToolBar/>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}
