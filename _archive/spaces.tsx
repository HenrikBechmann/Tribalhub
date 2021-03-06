// spaces.tsx
/*
TODO: 
    separate out space from spaces
    space should be given data source and context
*/
import * as React from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import SvgIcon from 'material-ui/SvgIcon'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Tabs, Tab} from 'material-ui/Tabs'

import { styles as globalstyles } from '../utilities/styles'

let styles = JSON.parse(JSON.stringify(globalstyles))

import SpaceGraph from './views/spacegraph'
import SpaceList from './views/spacelist'
import SpaceItem from './views/spaceitem'
import Splitter from './views/splitter'
import * as utilities from '../utilities/utilities'

class Spaces extends React.Component<any,any> {

    state = {
        menuopen:false,
        filterdialogopen:false,
        searchdialogopen:false,
        graphdata:{
            links:null,
            nodes:null,
        },
    }

    componentDidMount() {

        if (!this.state.graphdata.nodes) {
            utilities.getJsonFile('/db/sample.json').then((data) => {
                let graphdata = this.normalizeData(data)
                console.log('graphdata from sample file', graphdata)
                this.setState({
                    graphdata
                })
                // this.forceUpdate()
            }).catch((error) => {
                console.log('error getting sample file: ',error)
            })
        }

    }

    private callFunc = (self,funcname,args = null) => {
        return self[funcname](args)
    }

    normalizeData = (data) => {
        let nodes:any = {}
        let links:any = {}
        let records = data.records
        let record:any
        for (record of records) {
            let fields = record._fields
            let field:any
            for (field of fields) {
                if (field.type) { // link
                    if (!links[field.id]) {
                        links[field.id] = {
                            type:field.type,
                            id: field.id,
                            properties: field.properties,
                            startNode: field.startNode,
                            endNode: field.endNode,
                        }
                        if (!nodes[field.startNode].fields[field.type]) {
                            nodes[field.startNode].fields[field.type] = {}
                        }
                        if (!nodes[field.startNode].fields[field.type][field.id]) {
                            nodes[field.startNode].fields[field.type][field.id] = {
                                endNode:field.endNode,
                                properties:field.properties,
                            }
                        }
                    }
                } else { // node
                    if (!nodes[field.id]) {
                        nodes[field.id] = {
                            id:field.id,
                            labels:field.labels,
                            properties:field.properties,
                            fields:{}
                        }
                    }
                }
            }
        }
        return {
            nodes,
            links
        }
    }

    // ---------------------[ Filter Dialog ]-----------------------

    handleFilterDialogOpen = () => {
        this.setState({filterdialogopen: true});
    };

    handleFilterDialogClose = () => {
        this.setState({filterdialogopen: false});
    };


    filterDialog = (data) => {
        return <Dialog
            title = "Filter Space Components"
            actions = { this.filterdialogactions }
            open = { this.state.filterdialogopen }
            onRequestClose={this.handleFilterDialogClose}
        >
        <Tabs>
            <Tab label="Nodes" >
              <div>
                <h2>Select Node Types</h2>
                <p>
                  [list of node types]
                </p>
              </div>
            </Tab>
            <Tab label="Fields" >
              <div>
                <h2>Select Field Types</h2>
                <p>
                  [list of field types]
                </p>
              </div>
            </Tab>
        </Tabs>
        </Dialog>
    }

    filterdialogactions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleFilterDialogClose}
      />,
      <FlatButton
        label="Apply"
        primary={true}
        onClick={this.handleFilterDialogClose}
      />,
    ];

    // ---------------------[ Search Dialog ]-----------------------

    handleSearchDialogOpen = () => {
        this.setState({searchdialogopen: true});
    };

    handleSearchDialogClose = () => {
        this.setState({searchdialogopen: false});
    };

    searchDialog = (data) => {
        return <Dialog
            title = "Search for a Space Node"
            actions = { this.searchdialogactions }
            open = { this.state.searchdialogopen }
            onRequestClose={this.handleSearchDialogClose}
        >
        <Tabs>
        <Tab label="Search" >
          <div>
            <h2>Search for a node</h2>
            <p>
              [search results]
            </p>
          </div>
        </Tab>
        <Tab label="Sort" >
          <div>
            <h2>Sort nodes, then select one</h2>
            <p>
              [sort results]
            </p>
          </div>
        </Tab>
        </Tabs>
        </Dialog>
    }

    searchdialogactions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleSearchDialogClose}
      />,
      <FlatButton
        label="Select"
        primary={true}
        onClick={this.handleSearchDialogClose}
      />,
    ];

    // ---------------------[ Menus ]-----------------------

    handleMenuToggle = () => this.setState({menuopen: !this.state.menuopen});

    handleMenuClose = () => this.setState({menuopen: false});

    menudrawer = () => (<Drawer
            docked={false}
            open={this.state.menuopen}
            onRequestChange={(open) => this.setState({menuopen:open})}
        >
            <MenuItem 
                leftIcon = {
                    <img
                        src='/public/icons/campfire.svg'
                    />
                }
                primaryText = "About"
                onClick={this.handleMenuClose}
            />
            <MenuItem 
                leftIcon = {
                    <FontIcon className='material-icons'>local_library</FontIcon>
                }
                primaryText = "Tutorials"
                onClick={this.handleMenuClose}
            />
            <MenuItem 
                leftIcon = {
                    <FontIcon className='material-icons'>build</FontIcon>
                }
                primaryText = "Build"
                onClick={this.handleMenuClose}
            />
        </Drawer>
    )

    accountmenu = <IconMenu
            iconButtonElement = {
                <IconButton>
                    <FontIcon className='material-icons'>account_circle</FontIcon>
                </IconButton>
            }
            anchorOrigin = {{vertical:"bottom",horizontal:"right"}}
            targetOrigin = {{vertical:"top",horizontal:"right"}}
        >
            <MenuItem
                primaryText = "Login (existing users)"
            />
            <Divider />
            <MenuItem
                primaryText = "Register (new users)"
            />
        </IconMenu>

        // <IconButton
        //     onClick = { this.handleSearchDialogOpen }
        // >
        //     <FontIcon className='material-icons'>search</FontIcon>
        // </IconButton>
    spacemenu = <div>
            <IconButton>
                <FontIcon className='material-icons'>undo</FontIcon>
            </IconButton>
            <IconButton>
                <FontIcon className='material-icons'>redo</FontIcon>
            </IconButton>
            <IconButton
                onClick = { this.handleFilterDialogOpen }
            >
                <FontIcon className='material-icons'>filter_list</FontIcon>
            </IconButton>
            <IconButton>
                <FontIcon className='material-icons'>arrow_back</FontIcon>
            </IconButton>
            <IconButton>
                <FontIcon className='material-icons'>arrow_forward</FontIcon>
            </IconButton>
        </div>

    spaceoverflowmenu = <IconMenu
            iconButtonElement = {
                <IconButton>
                    <FontIcon className='material-icons'>more_vert</FontIcon>
                </IconButton>
            }
            anchorOrigin = {{vertical:"bottom",horizontal:"right"}}
            targetOrigin = {{vertical:"top",horizontal:"right"}}
        >
            <MenuItem
                leftIcon = {<FontIcon className='material-icons'>layers</FontIcon>}
                primaryText = "Workspaces"
            />
            <MenuItem
                leftIcon = {<FontIcon className='material-icons'>refresh</FontIcon>}
                primaryText = "Refresh"
            />
            <MenuItem
                leftIcon = {<FontIcon className='material-icons'>home</FontIcon>}
                primaryText = "Home space"
            />
            <MenuItem
                leftIcon = {<FontIcon className='material-icons'>settings</FontIcon>}
                primaryText = "Options"
            />
            <MenuItem
                leftIcon = {<FontIcon className='material-icons'>help</FontIcon>}
                primaryText = "Help"
            />
        </IconMenu>

    getSpaceGraph = () => {
        console.log('getSpaceGraph: this.state.graphdata',this.state.graphdata)
        return (<SpaceGraph data = {this.state.graphdata} />)
    }

    render() {

    return <div style={styles.frame}>
        { this.menudrawer() }
        { this.filterDialog(null) }
        { this.searchDialog(null) }
        <div style={styles.header}>
            <Toolbar style={styles.toolbar}>
                <ToolbarGroup>
                    <IconButton
                        onClick = {this.handleMenuToggle}
                    >
                        <FontIcon className='material-icons'>menu</FontIcon>
                    </IconButton>
                </ToolbarGroup>
                <ToolbarGroup>
                    { this.spacemenu }
                </ToolbarGroup>
                <ToolbarGroup>
                    { this.accountmenu }
                    { this.spaceoverflowmenu }
                </ToolbarGroup>
            </Toolbar>
            <div style={styles.title} >Demo: click on a node to remove it.</div>
        </div>
        <div style = {styles.main}>
            <Splitter 
                name = "First"
                primaryPane = {this.getSpaceGraph()}
                secondaryPane = {
                    <Splitter
                        name = "Second"
                        primaryPane = {<SpaceList />}
                        secondaryPane = {
                            <Splitter 
                                name = "Third"
                                primaryPane = {
                                    <SpaceItem />
                                  }
                                secondaryPane = {<SpaceItem />}
                                orientation = "horizontal"
                                showTabs = {true}
                            />
                        }
                        orientation = "vertical"
                        showTabs = {true}
                    />
                }
                orientation = "horizontal"
                division = {70}
                collapse = {1}
                showTabs = {true}
                showHandle = {true}
            />
        </div>
        <div style={styles.footer}>
            <div style={styles.status} >Status</div>
        </div>
    </div>
    
    }
}

export default Spaces
