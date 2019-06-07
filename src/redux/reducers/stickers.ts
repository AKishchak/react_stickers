import randomColor = require('randomcolor')

export interface IStickerSettings {
    id: number,
    text: string,
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
        id: 100 + list.length,
        text: payload.text,
        zIndex: 10 + list.length,
        top: window.innerHeight / 4 + 10 * list.length,
        left: window.innerWidth / 4 + 10 * list.length,
        color: randomColor({format: 'rgba', alpha: 0.5})
        //    color: randomColor({hue: 'yellow', format: 'rgba', alpha: 0.5})
    };
};

const initialState = {
    list: []
};

export const stickers = (state:IStickersState = initialState, action: any) => {
    switch (action.type) {
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
