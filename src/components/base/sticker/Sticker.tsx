import * as React from 'react';
import Draggable from 'react-draggable';
import './sticker.scss';

export interface IStickerProps {
    title: string;
    text: string;
    defaultWidth?: number;
    defaultHeight?: number;
    zIndex: number;
    top?: number;
    left?: number;
    color?: string;
    onTitleChange?(text: string): void;
    onTextChange?(text: string): void;
    handleDrag?(event: any, draggable: any): void;
    handleStart?(event: any, draggable: any): void;
    handleStop?(event: any, draggable: any): void;
}

interface IStickerState {
    width: number,
    height: number
}

const DEFAULT_FRAME = {
    WIDTH: 275,
    HEIGHT: 300
};

export class Sticker extends React.Component<IStickerProps, IStickerState> {

    constructor(props: IStickerProps){
        super(props);
        this.state = {
            width: this.props.defaultWidth || DEFAULT_FRAME.WIDTH,
            height: this.props.defaultHeight || DEFAULT_FRAME.HEIGHT
        };
    }

    public render() {
        const bounds = {
            left: 0,
            top: 0,
            right: window.innerWidth - this.state.width,
            bottom: window.innerHeight - this.state.height
        };

        const position = {
            y: this.props.top || 0,
            x: this.props.left || 0
        };

        const styles = {
            width: this.state.width,
            height: this.state.height,
            background: this.props.color
        };

        const titleHandle = (e: any) => {
            if (this.props.onTitleChange) {
                this.props.onTitleChange(e.target.value);
            }
        };
        const textHandle = (e: any) => {
            if (this.props.onTextChange) {
                this.props.onTextChange(e.target.value);
            }
        };

        return <Draggable onStart={this.props.handleStart}
                          onDrag={this.props.handleDrag}
                          onStop={this.props.handleStop}
                          handle={'.drag-handle'}
                          position={position}
                          bounds={bounds}
        >
            <div className={'sticker'} style={styles}>
                <div className="header">
                    <input type="text" className={'sticker-title'} defaultValue={this.props.title} onChange={titleHandle}/>
                    <div className={'drag-handle'} />
                </div>
                <div className="body">
                    <textarea defaultValue={this.props.text} onChange={textHandle}/>
                </div>
            </div>
        </Draggable>
    }
}