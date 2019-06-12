import * as firebase from 'firebase';
import * as React from "react";
import { connect } from 'react-redux'
import { Database } from '../../firebase'
import './toolbar.scss';
import {IStickerSettings} from "../../redux/reducers/stickers";

interface IToolbarProps {
    addNewSticker() : void,
    pingRedux() : void,
    getStickers() : void
}
export let userId = null;

class ToolBar extends React.Component<IToolbarProps> {
    public constructor(props: IToolbarProps) {
        super(props);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("SIGNED IN");
                userId = user.uid;
                // this.props.getStickers();
            } else {
                console.log("NOT SIGNED IN");
                userId = null;
            }
        });

    }

    private componentDidMount(): void {
        this.props.getStickers();
    }


    public render (){
        return(
            <div className="toolbar">
                <div>
                    <button className='create-window-button' onClick={() => this.props.addNewSticker()}>Add window</button>
                    <button className='create-window-button' onClick={this.props.pingRedux}>Action test</button>
                </div>
                <div>
                    <button className='login-button' onClick={this.firebaseOauth}>SignIn</button>
                    <button className='login-button' onClick={this.signOut}>SignOut</button>
                </div>
            </div>
        )
    }

    private firebaseOauth() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log(result.user)
            })
    }

    private signOut() {
        firebase.auth().signOut()
            .then(() => {
                console.log("Signed OUT");
            })
    }
}

export default connect(null, (dispatch) => {
    return {
        pingRedux: () => { console.log("1223") },
        addNewSticker: () => {
              /* Database.collection(userId).add({
                        title: 'NEW_STICKER',
                        content: "NEW ONE",
                        uid: userId
                })
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });*/
            dispatch({ type: "NEW_STICKER", payload: {} });
        },
        getStickers(obj: any, w: IStickerSettings) {
           dispatch({type: "GET_STICKERS", payload: {} });
        }
            // effect
            /*Database.collection(userId || 'stickers').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    dispatch({ type: "GET_STICKERS_COMPLETED", payload: {
                            id: doc.id,
                            uid: doc._document.proto.fields.uid.stringValue,
                            title: doc._document.proto.fields.title.stringValue === 'NEW_STICKER' ? null : doc._document.proto.fields.title.stringValue,
                            content: doc._document.proto.fields.content.stringValue === "NEW ONE" ? null : doc._document.proto.fields.content.stringValue
                        } });
                });
            });

        }*/
    }
})(ToolBar)
