'use strict';
import * as React from 'react';
import coredata from '../../data/coredata';
let state = coredata; // get font-family for non material-ui components
let fontFamily = state.theme.typography.fontFamily;
// 
import { DragDropContext } from 'react-dnd';
import DnDTouchBackend from 'react-dnd-touch-backend';
let DnDBackend = DnDTouchBackend({ enableMouseEvents: true });
// import V0MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import V0getMuiTheme from 'material-ui/styles/getMuiTheme'
// const V0muiTheme = V0getMuiTheme()
import MainView from './main.view';
class Main extends React.Component {
    constructor() {
        super(...arguments);
        this.mainviewstyle = {
            fontFamily,
        };
    }
    render() {
        let { globalmessage, version } = this.props;
        return (<MainView globalmessage={globalmessage} style={this.mainviewstyle}/>);
    }
}
export default DragDropContext(DnDBackend)(Main);
//# sourceMappingURL=main.controller.jsx.map