// directorybarholder.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import DirectoryBar from './directorybar.view';
import docproxy from '../../utilities/docproxy';
import LoadingMessage from '../common/loadingmessage.view';
const styles = createStyles({
    holderstyle: {
        boxSizing: 'border-box',
        height: '24px',
        borderRadius: '8px',
        backgroundColor: '#c7ddc7',
    },
});
class RootDirectoryBarHolder extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            item: null,
        };
        this.assertListener = () => {
            if (!this.itemProxy && this.props.itemProxy) {
                // console.log('asserting listener')
                this.itemProxy = this.props.itemProxy;
                this.props.setDocumentListener(this.itemProxy.doctoken, this.itemProxy.instanceid, this.cacheItemDocument);
            }
        };
        this.cacheItemDocument = (document, type, change) => {
            // console.log('caching item',document)
            this.setState({
                item: {
                    document,
                    type
                }
            });
        };
    }
    componentDidMount() {
        this.assertListener();
    }
    componentDidUpdate() {
        this.assertListener();
    }
    componentWillUnmount() {
        if (this.itemProxy) {
            this.props.removeDocumentListener(this.itemProxy.doctoken, this.itemProxy.instanceid);
        }
    }
    render() {
        // console.log('rendering',this.state)
        let { classes } = this.props;
        let listProxy;
        if (this.state.item) {
            let listtoken = {
                reference: '/lists/' + this.state.item.document.references.list,
            };
            listProxy = new docproxy({ doctoken: listtoken });
        }
        return (this.state.item ?
            <DirectoryBar haspeers={false} listProxy={listProxy} setDocumentListener={this.props.setDocumentListener} removeDocumentListener={this.props.removeDocumentListener} callDataDrawer={this.props.callDataDrawer} listStack={this.itemProxy.liststack} collapseDirectoryItem={() => { }} contextitem/>
            : <div className={classes.holderstyle}>
        <LoadingMessage />
    </div>);
    }
}
export default withStyles(styles)(RootDirectoryBarHolder);
//# sourceMappingURL=rootdirectorybarholder.view.jsx.map