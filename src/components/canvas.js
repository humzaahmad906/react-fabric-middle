import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import { TEXT_ADDED, OBJECT_SELECTED } from '../action/action';
import {objectSelected} from '../action/actioncreaters'
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
        
        this.objToAdd = null

        this.historyTracker = []
        this.redoId = ""
        this.redoAddTrigger = false
        this.propertiesTracker = {"id":[],"properties":[{"id":"", "states": []}]}
        this.historyCounter = -1
        this.stack = []
        this.layer_no = null
        this.drawing = false
        this.objectOver = false
        this.colorActive = false
        this.canvas.on("object:added", (e)=>{
            e.target.selectable = true;
            if (this.redoAddTrigger === true){
                e.target.id = this.redoId;
                this.redoAddTrigger = false
            }
            else{
                if (!("id" in e.target)){
                    e.target.id = Math.random().toString();
                    let isExists = false;
                    this.propertiesTracker.id.forEach((item)=>{
                        if(item===e.target.id){
                            isExists = true;
                        }
                    });
                    if(!isExists){
                        this.propertiesTracker.id.push(e.target.id);
                    }
                }
                
                if("recentAction" in e.target){
                    if (e.target.recentAction === true){
                        console.log("try");
                        delete e.target.recentAction;
                    }
                }else{
                    console.log(e.target.id);
                    e.target.allProperties = [JSON.stringify(e.target)];
                    e.target.counter = 0;
                    this.propertiesTracker.properties.push({"id": e.target.id, "states":[JSON.stringify(e.target)]});
                    // this.propertiesTracker.properties[0].states.push())
                        
                    
                    this.historyTracker.push(JSON.stringify({"id": e.target.id, "counter":e.target.counter, "type": e.target.type}));
                    this.historyCounter++;
                }  
            }
              
        });
        this.canvas.on("object:modified", (e)=>{
            console.log("recentAction in e.target", "recentAction" in e.target);

            if("recentAction" in e.target){
                if (e.target.recentAction === true){
                    console.log("phnch gya hai");
                    delete e.target.recentAction;
                    e.target.setCoords();
                    
                    // console.log(e.target.counter)
                }
            }else{
                // console.log("activeObject.counter>activeObject.allProperties.length-1")
                e.target.counter++;
                
                // e.target.allProperties.pop()
                // e.target.allProperties.push(JSON.stringify(e.target.id, e.target._stateProperties));
                // e.target.allProperties.push(JSON.stringify(e.target));
                // this.historyTracker.push(JSON.stringify({"id": e.target.id, "counter":e.target.counter}))
                // console.log(e.target._stateProperties)
                // console.log(e.target.allProperties)
                let isExists = false;
                // console.log(typeof(this.propertiesTracker.properties[0].states))
                this.propertiesTracker.properties.forEach((item)=>{
                    if(item.id === e.target.id){
                        item.states.pop();
                        item.states.push(JSON.stringify(e.target._stateProperties));
                        item.states.push(JSON.stringify(e.target));
                    }
                })
                
                this.historyTracker.push(JSON.stringify({"id": e.target.id, "counter": e.target.counter, "type": e.target.type}));
                this.historyCounter++;
            }
            
        })
        this.canvas.on("object:removed", (e)=>{
            if("recentAction" in e.target){
                if (e.target.recentAction === true){
                    delete e.target.recentAction;
                }
            }else{
                console.log("remove called");
                e.target.counter--;
                // this.undoStack.push(JSON.stringify({"type":"removed","id": e.target.id, "object":e.target}))
            }
            // this.histroryTracker.push(JSON.stringify({"id": e.target.id, "counter":-1}))
            // this.historyCounter++
            
        })
        this.canvas.on("selection:cleared", (e) => {
            console.log(e);
        })
        this.canvas.on("object:selected", (e) => {
            this.props.objectSelected(e.target.type);
        })
        this.canvas.on("mouse:down:before", (e) => {
            try{
                if(e.target.selectable === false){
                    this.canvas.isDrawingMode = true;
                }else{
                    this.canvas.isDrawingMode = false;
                }
            }catch(err){
                if(this.drawing){
                    this.canvas.isDrawingMode = true;
                }else{
                    this.canvas.isDrawingMode = false;
                }
            }  
        })
        this.canvas.on("mouse:up", (e) => {
            this.canvas.isDrawingMode = false;
            this.objectOver = true;
        })
        this.canvas.on("mouse:over", (e) => {
            try{
                if(e.target.type === "path"){
                    e.target.set({
                        "selectable": false,
                    })
                }
                else{
                    e.target.set({
                        "selectable": true,
                    })
                }
            }catch(err){
                console.log(err);
            }
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
            case OBJECT_SELECTED:
                switch(this.props.selectedObject){
                    case "textbox":

                        break;
                    default:
                        console.log(this.props.selectedObject);
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
const mapDispatchToProps = {objectSelected}
function mapStateToProps(state){
    return ({"canvasText": state.canvasText,
             "actionPerformed": state.actionPerformed,
             "selectedObject": state.selectedObject,
        })
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Canvas)