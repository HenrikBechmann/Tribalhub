// categorieslist.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import CategoryItem from './categoryitem.view';
class CategoriesList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            highlightrefuid: null,
        };
        this.listelement = null;
        this.expandCategory = (dataref) => {
            return (domSource) => {
                this.props.expandCategory(dataref, domSource);
            };
        };
        this.getListItems = listobject => {
            let { getListItem } = this.props;
            let { links } = listobject;
            let catitems = [];
            for (let dataref of links) {
                let data = getListItem(dataref);
                let highlight = (dataref.uid === this.state.highlightrefuid);
                let catitem = <CategoryItem key={dataref.uid} uid={dataref.uid} data={data} expandCategory={this.expandCategory(dataref)} highlight={highlight} highlightItem={this.props.highlightItem}/>;
                catitems.push(catitem);
            }
            return <div ref={element => {
                this.listelement = element;
            }}>{catitems}</div>;
        };
    }
    componentDidUpdate() {
        if (!this.props.highlightrefuid)
            return;
        this.setState({
            highlightrefuid: this.props.highlightrefuid,
        }, () => {
            this.setState({
                highlightrefuid: null
            });
        });
    }
    render() {
        let { listobject } = this.props;
        let listitems = this.getListItems(listobject);
        return <div style={{
            paddingLeft: '6px',
            paddingBottom: '32px',
        }}>
            {listitems}
        </div>;
    }
}
export default CategoriesList;
//# sourceMappingURL=categorylist.view.jsx.map