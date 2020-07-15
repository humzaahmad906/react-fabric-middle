import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {fabric} from 'fabric';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withTheme } from '@material-ui/core';
import {textAdded} from '../../action/actioncreaters'
import { OBJECT_SELECTED } from '../../action/action';

class TextAll extends Component{
    constructor(props){
        super(props);
        this.textboxRef = React.createRef()
        this.addText = () => {
            this.props.textAdded("TEXT ADDED");
        }
    }
    componentDidMount(){
        
    }
    componentDidUpdate(){
        if(this.props.actionPerformed === OBJECT_SELECTED){
            if(this.props.selectedObject === "textbox"){
                this.textboxRef.current.style.display = "block";
            }
        }
    }
    render(){
        return(
            <div>
                <div ref = {this.textboxRef} style = {{"display": "none"}} id = "textMenu">
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Fonts</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleChange}
                        >
                            <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
                            <MenuItem value={"Arial"}>Arial</MenuItem>
                            <MenuItem value={"Pacifico"}>Pacifico</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant = "contained" onClick = {this.italic}>
                        Italic
                    </Button>
                    <Button variant = "contained" onClick = {this.bold}>
                        Bold
                    </Button>
                    <Button variant = "contained" onClick = {this.underline}>
                        Underline
                    </Button>
                    <Button variant = "contained" onClick = {this.shadow}>
                        Shadow
                    </Button>
                    <Button variant = "contained" onClick = {this.fill}>
                        Fill
                    </Button>
                    <div>
                        <Typography id="discrete-slider" gutterBottom>
                            Font Size
                        </Typography>
                        <Slider
                            defaultValue={30}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={10}
                            max={100}
                            onChange={this.changeFontSize}
                        />
                    </div>
                </div>
                <Button variant = "contained"
                startIcon={<TextFieldsIcon />}
                onClick = {this.addText}>
                </Button>
            </div>
        )
        
    }
}

const mapDispatchToProps = {textAdded}
function mapStateToProps(state){
    return ({"actionPerformed": state.actionPerformed,
             "selectedObject": state.selectedObject,
        })
    
}
export default connect(mapStateToProps, mapDispatchToProps)(TextAll)