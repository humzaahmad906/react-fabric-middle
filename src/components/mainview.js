import React, {Component} from 'react';
import TextAll from './textbox/textbox';
import Button from '@material-ui/core/Button';
import Canvas from './canvas';
class MainView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <TextAll/>
                <Canvas/>
            </div>
        )
    }
}
export default MainView;