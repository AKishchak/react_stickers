import * as firebase from 'firebase';
import { Database } from '../firebase';
import { all } from 'redux-saga/effects';
import { takeEvery, put, all, call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import randomColor = require('randomcolor');
import {object} from "prop-types";

function* handleGetStickers() {

    let list = yield Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").get().then((querySnapshot) => {
        console.log(querySnapshot)
        let list = querySnapshot.docs.map((doc) => {
            return {
                id: doc._document.proto.fields.id.stringValue,
                title: doc._document.proto.fields.title.stringValue,
                content: doc._document.proto.fields.content.stringValue,
                zIndex: doc._document.proto.fields.zIndex.integerValue || doc._document.proto.fields.zIndex.stringValue,
                top: doc._document.proto.fields.top.doubleValue,
                left: doc._document.proto.fields.left.doubleValue,
                color: doc._document.proto.fields.color.stringValue
            }
        });
        console.log(list);
        return list;
    });

    yield put({ type: 'SET_STICKERS', payload: list })
}

function* handleAddSticker() {
    let stickerId = Math.random().toString();
    let length = yield Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").get().then((querySnapshot) => querySnapshot.docs.length);
    let sticker = yield Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").doc(stickerId).set({
        id: stickerId,
        title: 'NEW_STICKER',
        content: 'NEW ONE',
        zIndex: 10 + length,
        top: window.innerHeight / 4 + 10 * length,
        left: window.innerWidth / 4 + 10 * length,
        color: randomColor({format: 'rgba', alpha: 0.9})
    })
        .then(res => {
            console.log(res);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    yield put({ type: 'ADD_STICKER', payload: sticker })
}

function* handleUpdateSticker(action: { type: string, payload: any }) {
    console.log( action.payload)
    yield Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2")
        .doc(action.payload.w.id)
        .set(Object.assign({...action.payload.w},{
            id: action.payload.w.id,
            title: action.payload.title || action.payload.w.title,
            content: action.payload.content || action.payload.w.content,
            zIndex: action.payload.w.zIndex,
            top: action.payload.top || action.payload.w.top,
            left: action.payload.left || action.payload.w.left,
            color: action.payload.w.color
        }));

    yield put({ type: 'UPDATE', payload: action.payload.id })
}

function* handleDeleteSticker(action: { type: string, payload: any }) {
    //    let action = yield take('DELETE_STICKER');
    yield Database.collection("ilT52SazwGMnzbQqhqQWtNhx95P2").doc(action.payload.id).delete()
        .then(() => console.log("Document successfully deleted!"))
        .catch((error) => console.error("Error removing document: ", error)
    );

    yield put({ type: 'DELETE', payload: action.payload.id })
}

function* stickersSaga() {
    yield takeEvery('NEW_STICKER', handleAddSticker);
    yield takeEvery('GET_STICKERS', handleGetStickers);
    yield takeEvery('STICKER_UPDATE', handleUpdateSticker);
    yield takeEvery('DELETE_STICKER', handleDeleteSticker);
}


export default function* rootSaga() {
    yield all([
        stickersSaga()
    ]);
}
