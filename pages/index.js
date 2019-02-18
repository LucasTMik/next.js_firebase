import React, { Component } from 'react';
import firebase from "firebase";
import firebaseInit from '../lib/firebaseInit';



export default class App extends Component {
    
    constructor() {
        super();
        
        try{
            firebaseInit();
        } catch(err) {
            if(!/already exists/.test(err))
            console.log(err);
        }
        
        this.state = {
            text: ''
        };
    }
    
    
    componentDidMount() {
        const rootRef = firebase.database().ref().child('main');
        const speedRef = rootRef.child('text');
        
        speedRef.on('value', snap => {
            this.setState({
                text: snap.val()
            })
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
            </div>
        );
    }
}