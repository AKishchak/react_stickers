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

    /*private componentDidMount(): void {
        Database.collection("stickers").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.props.addNewSticker([], doc._document.proto.fields)
            });
        });
    }*/
    //    this.props.stickers.list = [...this.props.stickers.list, doc._document.proto.fields];

    public render (){
        return(
            <div className="toolbar">
                <div>
                    <button className='create-window-button' onClick={this.props.addNewSticker}>Add window</button>
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
                Database.collection('stickers').add({
                    title: 'TEST',
                    content: "NEW ONE"
                })
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            dispatch({ type: "NEW_STICKER", payload: {} });
        }
    }
})(ToolBar)