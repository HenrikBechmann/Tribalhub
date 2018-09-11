// baseform.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
/*
    patterned after first demo https://material-ui.com/demos/selects/ for 3.03
    use Typsecript fixes from here: https://material-ui.com/guides/typescript/
*/
// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
// })
class BaseForm extends React.Component {
    render() {
        const { classes } = this.props;
        return (<form className={classes.root} autoComplete="off">
                {this.props.children}
            </form>);
    }
}
export default withStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
})(BaseForm);
//# sourceMappingURL=baseform.view.jsx.map