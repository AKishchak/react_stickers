import randomColor = require('randomcolor');
import * as firebase from 'firebase';
import { Database } from '../../firebase';


export interface IStickerSettings {
    id: string,
    text: string,
    title: string,
    content: string,
    zIndex: number,
    top: number,
    left: number,
    color: any
}

export interface IStickersState {
    list: IStickerSettings[]
}

const createSticker = (list: any[], payload: any) :IStickerSettings => {
    return {
        id: payload.id,
        text: payload.content,
        title: payload.title,
        content: payload.content,
        zIndex: 10 + list.length,
        top: window.innerHeight / 4 + 10 * list.length,
        left: window.innerWidth / 4 + 10 * list.length,
        color: randomColor({format: 'rgba', alpha: 0.9})
        //    color: randomColor({hue: 'yellow', format: 'rgba', alpha: 0.5})
    };
};
const initialState = {
    list: []
};
/*const initialState = {
    list: Database.collection("stickers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            Object.assign({}, doc._document.proto.fields)
        });
    })
};*/

export const stickers = (state:IStickersState = initialState, action: any) => {
    switch (action.type) {
        case 'GET_STICKERS':
            return {
                list: [
                    ...state.list,
                    createSticker(state.list, action.payload)
                ]
            };
        case 'NEW_STICKER':
            return {
                list: [
                    ...state.list,
                    createSticker(state.list, action.payload)
                ]
            };
        case 'STICKER_UPDATE':
            return {
                list: state.list.map((e) => {
                    if(e.id === action.payload.id) {
                        return Object.assign({ ...e}, action.payload);
                    }
                    return Object.assign({}, e);
                })
            };
        case 'DELETE_STICKER':
            return {
                list: state.list.filter((e) => {
                    return e.id !== action.payload.id;
                })
            };
        default:
            return state;
    }
};

/*
Database.collection("stickers").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                Object.assign({}, doc._document.proto.fields);
            });
        });
*/