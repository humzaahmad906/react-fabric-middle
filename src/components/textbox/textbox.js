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
import TextField from '@material-ui/core/TextField';
import {textAdded, textboxDispatcher} from '../../action/actioncreaters'
import { OBJECT_SELECTED, SELECTION_CLEARED } from '../../action/action';

class TextAll extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: ""
        }
        this.update = true
        this.textboxRef = React.createRef()
        this.textRef = React.createRef()
        this.addText = () => {
            this.props.textAdded("TEXT ADDED");
        }
        this.italic = () => {
            this.props.textboxDispatcher({name: "ITALIC"});
        }
        this.bold = () => {
            this.props.textboxDispatcher({name: "BOLD"});
        }
        this.underline = () => {
            this.props.textboxDispatcher({name: "UNDERLINE"});
        }
        this.fill = () => {
            this.props.textboxDispatcher({name: "FILL", fillColor: "grey",});
        }
        this.fontFamily = (e) => {
            this.props.textboxDispatcher({name: "FONT_FAMILY", font: e.target.value});
        }
        this.shadow = (e) => {
            this.props.textboxDispatcher({name: "SHADOW", shadowColor: "red"})
        }
        this.changeFontSize = (e, value) => {
            this.props.textboxDispatcher({name: "FONT_SIZE", fontSize: value,});
        }
        this.text = (e) => {
            if(e.target.value !== this.state.text){
                this.setState({text: e.target.value});
                this.props.textboxDispatcher({name: "TEXT", text: e.target.value,})
            }
            
        }
        this.changeState = (text) => {
            
            this.update = false;
            this.setState({text: text})

        }
        
    }
    componentDidUpdate(){
        if(this.update){
            console.log(this.props.selectedObject.type)
            switch(this.props.actionPerformed[this.props.actionPerformed.length-1]){
                case OBJECT_SELECTED:
                    if(this.props.selectedObject.type === "textbox"){
                        this.textboxRef.current.style.display = "block";
                        this.props.textboxEvent.forEach((item) => {
                            if(item.selected === true){
                                console.log(item.text);
                                this.changeState(item.text);
                            }
                        })
                    }
                    
                    break;
                case SELECTION_CLEARED:
                    this.textboxRef.current.style.display = "none"
                    break;
                default:
                    console.log(this.props.actionPerformed)
            }
        }
        else{
            this.update = true
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
                        onChange={this.fontFamily}
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
                    <form noValidate autoComplete="off">
                        <TextField id="outlined-basic" value = {this.state.text} ref = {this.textRef} onChange={this.text} label="Outlined" variant="outlined" />
                    </form>
                </div>
                <Button variant = "contained"
                startIcon={<TextFieldsIcon />}
                onClick = {this.addText}>
                </Button>
            </div>
        )
        
    }
}

const mapDispatchToProps = {textAdded, textboxDispatcher}
function mapStateToProps(state){
    return ({"actionPerformed": state.actionPerformed,
             "selectedObject": state.selectedObject,
             "textboxEvent": state.textboxEvent,
        })
    
}
export default connect(mapStateToProps, mapDispatchToProps)(TextAll)