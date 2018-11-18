// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
// main.controller.tsx
/*
    bootstrap:
    1. index.html
    2. index.tsx
    3. main.controller
    4. main.view
    5. approuter
    6. routes
*/
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
// TODO: temporary -- replace with application service
import coredata from '../../data/coredata';
let fontFamily = coredata.theme.typography.fontFamily;
import { DragDropContext } from 'react-dnd';
// import DnDHTMLBackend from 'react-dnd-html5-backend'
import DnDTouchBackend from 'react-dnd-touch-backend';
import DnDHtml5Backend from 'react-dnd-html5-backend';
import application from '../services/application';
let isMobile = application.properties.ismobile;
let DnDBackend = isMobile ? DnDTouchBackend : DnDHtml5Backend;
import MainView from './main.view';
import authapi from '../services/auth.api';
import UserDataContext from '../services/userdata.context';
import { toast } from 'react-toastify';
import { withStyles, createStyles } from '@material-ui/core/styles';
let styles = createStyles({
    mainviewstyle: {
        fontFamily: fontFamily,
    }
});
let Main = class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            userProviderData: null,
        };
        this.getUserCallback = (login) => {
            if (login) {
                toast.success(`signed in as ${login.displayName}`, { autoClose: 2500 });
            }
            let userProviderData = login ? login.providerData[0] : null;
            this.setState({
                login,
                userProviderData,
            });
        };
        authapi.setUpdateCallback(this.getUserCallback);
    }
    render() {
        let { globalmessage, version, classes } = this.props;
        let userdata = {
            login: this.state.userProviderData,
            user: null,
            account: null,
        };
        return (<UserDataContext.Provider value={userdata}>
                <MainView globalmessage={globalmessage} className={classes.mainviewstyle}/>
            </UserDataContext.Provider>);
    }
};
Main = __decorate([
    DragDropContext(DnDBackend)
], Main);
export default withStyles(styles)(Main);
//# sourceMappingURL=main.controller.jsx.map