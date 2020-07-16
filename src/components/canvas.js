import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import { TEXT_ADDED, OBJECT_SELECTED, TEXTBOX_EVENT } from '../action/action';
import {objectSelected, selectionCleared, appendTextObj} from '../action/actioncreaters'
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
                if(e.target.type === "textbox"){
                    this.props.appendTextObj(e.target.id, e.target.type)
                }
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
        this.canvas.on("selection:created", (e) => {
            this.props.objectSelected(e.target.id, e.target.type);
        })
        this.canvas.on("selection:updated", (e) => {
            this.props.selectionCleared();
            this.props.objectSelected(e.target.id, e.target.type);
        })
        this.canvas.on("selection:cleared", (e) => {
            this.props.selectionCleared();
        })
        
        this.canvas.renderAll();
    }
    componentDidUpdate(){
        console.log(this.props.actionPerformed[this.props.actionPerformed.length-1])
        switch(this.props.actionPerformed[this.props.actionPerformed.length-1]){
            case TEXT_ADDED:
                const text = new fabric.Textbox(this.props.canvasText, {
                    fill: "white",
                    fontSize: 30,
                });
                this.canvas.add(text);
                this.canvas.renderAll();
                break;
            case TEXTBOX_EVENT:
                this.props.textboxEvent.forEach((item) => {
                    if(item.selected === true){
                        this.canvas.getActiveObject().set({
                            text: item.text,
                            fontSize: item.fontSize,
                            fontFamily: item.fontFamily,
                            underline: item.underline,
                            textBackgroundColor: item.fill,
                        });
                        if(item.bold === true){
                            this.canvas.getActiveObject().set({fontWeight: "bold"});
                        }
                        else if(item.italic === true){
                            this.canvas.getActiveObject().set({fontWeight: "italic"});
                        }
                        else{
                            this.canvas.getActiveObject().set({fontWeight: "normal"});
                        }
                        if(item.shadow.isShadow){
                            const shadow = new fabric.Shadow({
                                'color': item.shadow.shadowColor,
                                'blur': 5,
                            })
                            this.canvas.getActiveObject().set({
                                shadow: shadow,
                            });
                        }
                        this.canvas.renderAll();
                    }
                })
                
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
const mapDispatchToProps = {objectSelected, selectionCleared, appendTextObj}
function mapStateToProps(state){
    return ({"canvasText": state.canvasText,
             "actionPerformed": state.actionPerformed,
             "selectedObject": state.selectedObject,
             "textboxEvent": state.textboxEvent,
        })
}
export default connect(mapStateToProps, mapDispatchToProps)(Canvas)