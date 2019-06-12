import * as firebase from 'firebase';
import { Database } from '../firebase';
import { all } from 'redux-saga/effects';
import { takeEvery, put, all, call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import randomColor = require('randomcolor');

function* handleAddSticker() {
    /*let sticker = yield Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").add({
        id: Math.random().toString(),
        title: 'NEW_STICKER',
        content: "NEW ONE",
    })
    .then(res => {
        console.log(res);
     })
     .catch((error) => {
         console.error("Error adding document: ", error);
     });*/

    yield put({ type: 'NEW_STICKER', payload: {
            id: Math.random().toString(),
            title: 'NEW_STICKER',
            content: "NEW ONE"
        } })
}

function* handleGetStickers() {

    let list = yield Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").get().then((querySnapshot) => {
        let list = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                title: doc._document.proto.fields.title.stringValue,
                content: doc._document.proto.fields.content.stringValue,
                zIndex: doc._document.proto.fields.zIndex.stringValue,
                top: doc._document.proto.fields.top.stringValue,
                left: doc._document.proto.fields.left.stringValue,
                color: doc._document.proto.fields.color.stringValue
            }
        });
        return list;
    });

    yield put({ type: 'SET_STICKERS', payload: list })
}


function* stickersSaga() {
    yield takeEvery('NEW_STICKER', handleAddSticker);
    yield takeEvery('GET_STICKERS', handleGetStickers)
}


export default function* rootSaga() {
    yield all([
        stickersSaga()
    ]);
}
