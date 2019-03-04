import * as React from "react";

// import Main from './main/Main'
import {Route, BrowserRouter, Switch} from "react-router-dom";
import AboutPage from "../about/about";
import StickersPage from "../stickers/stickers";
import Main from "./main/Main";
import Pendulum from "../doublePendulum/pendulum";

export default class Root extends React.Component {

    public render(){
        return <BrowserRouter>
                <Switch>
                    {
                        this.getMainRoutes()
                    }
                </Switch>
            </BrowserRouter>
    }

    private getMainRoutes(){
        return <Main>
                <Route path='/' exact={true} component={StickersPage}/>
                <Route path='/about'  component={AboutPage}/>
                <Route path='/pendulum'  component={Pendulum}/>
            </Main>
    }
}