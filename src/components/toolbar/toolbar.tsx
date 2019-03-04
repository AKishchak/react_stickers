import * as firebase from 'firebase';
import * as React from "react";
import { connect } from 'react-redux'
import { Database } from '../../firebase'
import './toolbar.scss';

interface IToolbarProps {
    addNewSticker() : void,
    pingRedux() : void
}

class ToolBar extends React.Component<IToolbarProps> {
    public constructor(props: IToolbarProps) {
        super(props);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                console.log("SIGNED IN")
            } else {
                console.log("NOT SIGNED IN")
            }
        });
    }

    public render (){
        return <div className="toolbar">
            <button className='create-window-button' onClick={this.props.addNewSticker}>Add window</button>
            <button className='create-window-button' onClick={this.props.pingRedux}>Action test</button>
            <button onClick={this.firebaseOauth}>SignIn</button>
            <button onClick={this.signOut}>SignOut</button>
        </div>
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
                Database.collection('stickers').add({
                    title: 'TEST',
                    content: "NEW ONE"
                })
                .then(res => {
                    console.log(res);
                });
            dispatch({ type: "NEW_STICKER", payload: {} });
        }
    }
})(ToolBar)