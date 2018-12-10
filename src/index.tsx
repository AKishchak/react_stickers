import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/layout/app/App';
import './index.scss';
import { persistor, store } from './redux';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root') as HTMLElement;

registerServiceWorker();


const render = (RootComponent: any) => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {RootComponent}
            </PersistGate>
        </Provider>,
        rootEl
    );
};

render(<App/>);

if ((module as any).hot) {
    (module as any).hot.accept('./components/layout/app/App', () => {
        const NextApp = require('./components/layout/app/App').default
        render(<NextApp/>)
    })
}