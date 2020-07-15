import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import { TEXT_ADDED, OBJECT_SELECTED, TEXTBOX_EVENT } from '../action/action';
import {objectSelected, selectionCleared} from '../action/actioncreaters'
class Canvas extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.canvas = new fabric.Canvas('c',{
            height: 500,
            width: 500,
            backgroundColor: "black",
            isDrawingMode: false,
            stateful:true
        })
        
        this.record = true;
        this.pointer = -1
        this.canvasObjects = [];
        this.historyTracker = [];
        this.canvas.on("object:added", (e)=>{
            if(!("id" in e.target)){
                e.target.id = Math.random().toString();
                this.canvasObjects.push(JSON.stringify(e.target));
                this.historyTracker.push(JSON.stringify({id: e.target.id, performedAction: "objectAdded"}));
                this.pointer++;
                this.record = false;
            }
        });
        this.canvas.on("object:modified", (e)=>{
            console.log("recentAction in e.target", "recentAction" in e.target);

            if(this.record){
                this.historyTracker.push(JSON.stringify({id: e.target.id, performedAction: "objectModified", properties: e.target}));
                this.pointer++
                this.record = false;
            }
            
        })
        this.canvas.on("object:removed", (e)=>{
            if(this.record){
                console.log(this.historyTracker[this.pointer+1])
                this.historyTracker.push(JSON.stringify({id: e.target.id, performedAction: "objectRemoved"}));
                this.pointer++
                this.record = false;
            }
            
        })
        this.canvas.on("selection:cleared", (e) => {
            this.props.selectionCleared();
        })
        this.canvas.on("object:selected", (e) => {
            this.props.objectSelected(e.target.type);
        })
        this.canvas.renderAll();
    }
    componentDidUpdate(){
        switch(this.props.actionPerformed){
            case TEXT_ADDED:
                const text = new fabric.Textbox(this.props.canvasText, {
                    "fill": "white",
                });
                this.canvas.add(text);
                this.canvas.renderAll();
                break;
            case TEXTBOX_EVENT:
                switch(this.props.textboxEvent){
                    case "NORMAL":
                        this.canvas.getActiveObject().set({
                            fontWeight: "normal"
                        });
                        this.canvas.renderAll();
                        break;
                    case "ITALIC":
                        this.canvas.getActiveObject().set({
                            fontWeight: "italic"
                        });
                        this.canvas.renderAll();
                        break;
                    case "BOLD":
                        this.canvas.getActiveObject().set({
                            fontWeight: "bold"
                        });
                        this.canvas.renderAll();
                        break;
                    case "UNDERLINE":
                        this.canvas.getActiveObject().set({
                            underline: true,
                        });
                        this.canvas.renderAll();
                        break;
                    case "NOUNDERLINE":
                        this.canvas.getActiveObject().set({
                            underline: false,
                        });
                        this.canvas.renderAll();
                        break;
                    default:
                        console.log(this.props.textboxEvent)
                }
                break;
            default:
                console.log(this.props.actionPerformed);
        }
        
    }
    render(){
        return(
            <canvas id = "c"></canvas>
        )
        
    }
}
const mapDispatchToProps = {objectSelected, selectionCleared}
function mapStateToProps(state){
    return ({"canvasText": state.canvasText,
             "actionPerformed": state.actionPerformed,
             "selectedObject": state.selectedObject,
             "textboxEvent": state.textboxEvent,
        })
}
export default connect(mapStateToProps, mapDispatchToProps)(Canvas)