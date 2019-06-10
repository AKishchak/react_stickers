import * as React from 'react';
import { connect } from 'react-redux'
import './stickerContainer.scss';

import {IReduxState} from "../../redux";
// import {IStickersState} from "../../redux/reducers";
import {IStickerSettings} from "../../redux/reducers/stickers";
import { Sticker } from '../base/sticker/Sticker';
import {Database} from "../../firebase";
import userId from '../toolbar/toolbar';

export interface IStickerContainerProps {
    stickers: any,
    onStickerUpdate(updates: any, window: IStickerSettings): void;
    deleteSticker(updates: any, window: IStickerSettings): void;
}
class StickerContainer extends React.Component<IStickerContainerProps, {}> {

    constructor(props: IStickerContainerProps){
        super(props);
        this.state = {
            // width: this.props.defaultWidth || DEFAULT_FRAME.WIDTH,
            // height: this.props.defaultHeight || DEFAULT_FRAME.HEIGHT
        };
    }

    public render() {
        return <div className={'sticker-container'}>
            { this.props.stickers.list.map((w:any, key:any) => {
                console.log(w);
                const dragHandler = (event: any, d: any) => this.props.onStickerUpdate({
                    left: d.x,
                    top: d.y
                }, w);
                const textHandler = (text: string) => this.props.onStickerUpdate({ content: text }, w);
                const titleHandler = (text: string) => this.props.onStickerUpdate({ title: text }, w);
                const deleteSticker = (event: any) => this.props.deleteSticker({event}, w);
                return <Sticker {...w}
                                handleStop={dragHandler}
                                onTextChange={textHandler}
                                onTitleChange={titleHandler}
                                key={key}
                                deleteSticker={deleteSticker}/>
            }) }
        </div>
    }
}

export default connect((state: IReduxState) => {
    return {
        stickers: state.stickers
    };
}, (dispatch) => {
    return {
        onStickerUpdate(obj: any, w: IStickerSettings) {
            Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").doc(w.id).set({title: w.title, content: w.content})
            dispatch({ type: "STICKER_UPDATE", payload: Object.assign(obj, { id: w.id }) });
        },
        deleteSticker(obj: any, w: IStickerSettings) {
           //   Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").doc(w.id).delete()
            dispatch({type: "DELETE_STICKER", payload: Object.assign(obj, {id: w.id}) });
        }
    }
})(StickerContainer);
