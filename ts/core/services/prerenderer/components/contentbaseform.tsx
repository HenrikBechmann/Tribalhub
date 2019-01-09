// baseform.view.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'

/*
    patterned after first demo https://material-ui.com/demos/selects/ for 3.03
    use Typsecript fixes from here: https://material-ui.com/guides/typescript/
*/

const styles = () => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems:'center',
  },
})

class ContentBaseForm extends React.Component<any,any> {

    render() {
        const { classes, onSubmit, disabled } = this.props

        return (
            <form 
                onSubmit = {(event) => {
                    event.preventDefault()
                    if (!disabled) {
                        onSubmit && onSubmit()
                    }
                }}
                className = { classes.root } 
                autoComplete="off" 
            > 
                { this.props.children }
            </form>
        )
    }

}

export default withStyles( styles )( ContentBaseForm )