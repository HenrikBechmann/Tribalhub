// databox.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import BoxIdentityBar from './databox/identitybar.view';
import BoxTypebar from './databox/typebar.view';
// import ProfileBar from './databox/profilebar.view'
// import ProfileForm from './databox/profileform.view'
import DirectoryBar from './databox/directorybar.view';
import DirectoryList from './databox/directorylist.view';
// import ScanBar from './databox/scanbar.view'
import ResizeTab from './databox/resizetab.view';
import NavigationMenuTab from './databox/navigationmenutab.view';
import proxy from '../utilities/proxy';
const styles = createStyles({
    wrapper: {
        boxSizing: 'border-box',
    },
    frame: {
        backgroundColor: 'white',
        maxHeight: '96%',
        minHeight: '60%',
        boxSizing: 'border-box',
        borderRadius: '8px',
        fontSize: 'smaller',
        position: 'relative',
        transition: 'width .5s',
    },
    indexMarker: {
        position: 'absolute',
        bottom: '-16px',
        left: '0',
        fontSize: 'smaller',
        color: 'gray',
    },
    identityBar: {
        height: 'calc(100% - 78px)',
        position: 'relative',
    },
});
class DataBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightrefuid: null,
            item: null,
            MainlistProxy: null,
            BarlistProxy: null,
            TypelistProxy: null,
        };
        // always available; no need to check state
        this.itemProxy = this.props.itemProxy;
        this.cacheItemData = (document, type) => {
            this.setState({
                item: {
                    document,
                    type
                }
            }, () => {
                if (!this.state.MainlistProxy) { // no proxies have been set
                    let listdoctoken;
                    if (this.itemProxy.liststack.length) {
                        listdoctoken = this.itemProxy.liststack[this.itemProxy.liststack.length - 1];
                    }
                    else {
                        listdoctoken = {
                            uid: this.state.item.document.references.list,
                            repo: 'lists',
                        };
                    }
                    this.setState({
                        MainlistProxy: new proxy({ token: listdoctoken }),
                        BarlistProxy: new proxy({ token: listdoctoken }),
                        TypelistProxy: new proxy({ token: listdoctoken }),
                    });
                }
            });
        };
        this.doHighlights = (collapseTargetProxy) => {
            this.props.callbacks.highlightBox({ boxElement: this.boxframe.current });
            if (collapseTargetProxy.action == 'expand' ||
                collapseTargetProxy.action == 'splay') {
                let token = collapseTargetProxy.liststack[collapseTargetProxy.liststack.length - 1];
                if (token) {
                    setTimeout(() => {
                        this.setState({
                            highlightrefuid: token.uid,
                        }, () => {
                            this.setState({
                                highlightrefuid: null
                            });
                        });
                    });
                }
            }
        };
        this.collapseDirectoryItem = () => {
            this.props.callbacks.collapseDirectoryItem(this.itemProxy);
        };
        this.splayBox = (domSource, listDocument) => {
            return this.props.callbacks.splayBox(domSource, this.listcomponent, listDocument);
        };
        this.highlightItem = (itemref) => {
            let itemelement = itemref.current;
            itemelement.classList.add('highlight');
            setTimeout(() => {
                itemelement.classList.remove('highlight');
            }, 2000);
        };
        this.indexmarker = (classes) => {
            return (this.props.haspeers ?
                <div className={classes.indexMarker}>{this.props.index + 1}</div>
                : null);
        };
        this.listcallbacks = {
            setListListener: this.props.callbacks.setListListener,
            removeListListener: this.props.callbacks.removeListListener,
            expandDirectoryItem: this.props.callbacks.expandDirectoryItem,
            highlightItem: this.highlightItem,
        };
        this.typecallbacks = {
            setListListener: this.props.callbacks.setListListener,
            removeListListener: this.props.callbacks.removeListListener,
            splayBox: this.splayBox,
            selectFromSplay: this.props.callbacks.selectFromSplay,
        };
        this.boxframe = React.createRef();
        this.listcomponent = React.createRef();
    }
    componentDidMount() {
        // console.log('did mount',this.itemProxy?this.itemProxy.instanceid:'no item')
        let { itemProxy } = this;
        this.props.callbacks.setItemListener(itemProxy.token, itemProxy.instanceid, this.cacheItemData);
    }
    componentDidUpdate() {
        let { collapseTargetProxy } = this.props; // gets set then cancelled by parent
        if (collapseTargetProxy) { // if found, queue the trigger
            this.queueCollapseTargetProxy = collapseTargetProxy;
        }
        if (!this.state.item)
            return; // wait for item document to appear
        if (!this.queueCollapseTargetProxy)
            return;
        // pick up and clear the queue
        collapseTargetProxy = this.queueCollapseTargetProxy;
        this.queueCollapseTargetProxy = null;
        this.collapseTargetProxy = collapseTargetProxy; // for coloring target box border
        setTimeout(() => {
            this.doHighlights(collapseTargetProxy);
            setTimeout(() => {
                this.collapseTargetProxy = null; // clear queue for box border
            }, 2000);
        });
    }
    componentWillUnmount() {
        // unsubscribe data
        // console.log('unmounting',this.itemProxy.instanceid)
        let { itemProxy } = this;
        this.props.callbacks.removeItemListener(itemProxy.token, itemProxy.instanceid);
    }
    render() {
        let { haspeers, classes } = this.props;
        let item = this.state.item ? this.state.item.document : null;
        let itemType = this.state.item ? this.state.item.type : null;
        let listStack = this.itemProxy.liststack;
        // over-rides for placeholder
        if (!item) {
            let wrapperStyle = {
                height: (this.props.containerHeight - 16) + 'px',
                width: haspeers ? (this.props.boxwidth + 56) + 'px' : 'auto',
                float: haspeers ? 'left' : 'none',
                padding: haspeers ? 'initial' : '16px',
            };
            let frameStyle = {
                maxHeight: '100%',
                height: '96%',
                width: haspeers ? 'none' : (this.props.boxwidth) + 'px',
                margin: haspeers ? '16px 40px 16px 16px' : 'auto',
            };
            return <div className={classes.wrapper} style={wrapperStyle}>
                <div className={classes.frame} style={frameStyle}>
                    <CircularProgress size={24}/>
                </div>
            </div>;
        }
        // over-rides
        let wrapperStyle = {
            float: haspeers ? 'left' : 'none',
            width: haspeers ? (this.props.boxwidth + 56) + 'px' : 'none',
            padding: haspeers ? 'none' : '16px',
        };
        let frameStyle = {
            border: this.collapseTargetProxy ? '1px solid blue' : '1px solid silver',
            boxShadow: haspeers ? 'none' : '0 0 12px black',
            width: haspeers ? 'none' : (this.props.boxwidth) + 'px',
            margin: haspeers ? '16px 40px 16px 16px' : 'auto',
        };
        return <div data-index={this.props.index} className={classes.wrapper} style={wrapperStyle}>
            <div className={classes.frame} style={frameStyle} ref={this.boxframe}>
                <NavigationMenuTab />
                {!haspeers && <ResizeTab boxwidth={this.props.boxwidth} boxframe={this.boxframe} setBoxWidth={this.props.callbacks.setBoxWidth}/>}
                {false && <BoxTypebar item={item} itemType={itemType /*future*/} listProxy={this.state.TypelistProxy} haspeers={this.props.haspeers} callbacks={this.typecallbacks}/>}
                {false && <BoxIdentityBar item={item}/>}

                <div className={classes.identityBar}>

                    <DirectoryBar listProxy={this.state.BarlistProxy} setListListener={this.props.callbacks.setListListener} removeListListener={this.props.callbacks.removeListListener} listStack={this.itemProxy.liststack} collapseDirectoryItem={this.collapseDirectoryItem}/>
                    
                    <DirectoryList ref={this.listcomponent} listProxy={this.state.MainlistProxy} highlightrefuid={this.state.highlightrefuid} containerHeight={this.props.containerHeight} callbacks={this.listcallbacks}/>
                    
                    {this.indexmarker(classes)}

                </div>

            </div>
        </div>;
    }
}
export default withStyles(styles)(DataBox);
//# sourceMappingURL=databox.controller.jsx.map