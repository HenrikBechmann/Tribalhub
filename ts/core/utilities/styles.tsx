import theme from 'material-ui/styles/baseThemes/lightBaseTheme'

// TODO getMuiTheme may be preferable in the long run,
// or theme available from global state
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// let muiTheme = getMuiTheme()
// console.log(muiTheme)

// TODO: register issue with 'justify-content' bad interface

export let styles = {
    origin:{
        float:'left',
        width:'66px',
        height:'66px',
        border:'1px solid silver',
        backgroundColor:'lightblue',
        borderRadius:'50%',
        overflow:'hidden',
    },
    toolbar:{height:'56px'},
    title:{backgroundColor:'palegoldenrod',height:'16px',fontFamily:theme.fontFamily,textColor:theme.palette.textColor,fontSize:'.8em',whiteSpace:'nowrap',overflow:'hidden',padding:'3px'},
    filterbox:{display:'none',backgroundColor:'black',color:'white',position:'absolute',top:'10px',right:'10px',left:'10px'},
    status:{backgroundColor:'palegoldenrod',height:'1.5em',width:'calc(100% - 6px)',position:'absolute',bottom:0,border:'3px ridge gray',borderRadius:'6px'},
    graph:{backgroundColor:'lightcyan',position:'relative',height:'calc(100% - 72px'},
    addbutton:{position:'absolute',right:'5px',top:'5px'},
    list:{backgroundColor:'lightgreen',height:'600px'},
    originframe:{float:'left',backgroundColor:'lightgreen',borderRadius:'8px',border:'3px ridge gray'},
    topframe:{position:'absolute',top:0,right:0,left:0,bottom:'calc(45% + 2px'}, 
    splitter:{position:'absolute',bottom:'45%',width:'100%',height:0,borderTop:'2px solid gray'}, 
    collapsetabtop:{position:'absolute',height:'36px',width:'48px',bottom:'1px',right:'10px',backgroundColor:'#cff',zIndex:1,display:'flex',"justify-content":"center",alignItems:'center',border:'1px solid gray',cursor:'pointer',borderRadius:'6px 6px 0 0'},
    collapsetabbottom:{position:'absolute',height:'36px',width:'48px',top:'-1px',right:'10px',backgroundColor:'#d3f8d3',zIndex:1,display:'flex',"justify-content":"center",alignItems:'center',border:'1px solid gray',cursor:'pointer',borderRadius:'0 0 6px 6px'},
    bottomframe:{overflow:'scroll',backgroundColor:'green',position:'absolute',bottom:0,right:0,left:0,top:'55%'},
    frame:{position:'absolute',top:0,right:0,bottom:0,left:0}
}
