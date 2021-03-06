// auth.api.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import firebase from './firebase.api'

let provider = new firebase.auth.GoogleAuthProvider()

let stateresolved = false

firebase.auth().onAuthStateChanged((newuser) => {

  stateresolved = true
  let currentUser = firebase.auth().currentUser
  if (newuser) {
    let loginlocal = Object.assign({},newuser.providerData[0]) // google provider; shortcut for newuser data
    loginlocal.uid = newuser.uid // google auth common uid
    login = loginlocal

    currentUser.getIdToken().then(token =>{
      idToken = token
    })

    getRedirectResult()

  }
  if (updateCallback) {
      updateCallback(newuser)
  }
})

const googlesignin = () => {

    firebase.auth().signInWithRedirect(provider)

}

const googlesignout = () => {
    if (!firebase.auth().currentUser) return
    firebase.auth().signOut()
}

let accessToken = null
let idToken = null
let login = null

function getRedirectResult() {
    firebase.auth().getRedirectResult().then(function(result:any) {

      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let newaccesstoken = result.credential.accessToken;
        if (newaccesstoken) {
            accessToken = newaccesstoken
        }
        // ...
      }

    }).catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the login's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log('error of getRedirect',{errorCode,errorMessage,email,credential,error})

    });
}

const getUser = (callback:Function) => {
    let intervalId = setInterval(()=>{
        if (stateresolved) {
            clearInterval(intervalId)
            setTimeout(()=>{ // clear code queue
                callback(login)
            })
        }
    },30)
}
const getIdToken = () => idToken
const getAccessToken = () => accessToken

let updateCallback = null

const setUpdateCallback = callback => {
    updateCallback = callback
}

let authapi = {
    googlesignin,
    googlesignout,
    getUser,
    getIdToken,
    getAccessToken,
    setUpdateCallback,
}

export default authapi
