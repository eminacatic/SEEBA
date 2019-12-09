import React, {Component} from 'react'
import './App.css'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
        files : [],
        id : [] // id is needed for deleting images, to find target image
    }
    this.onChange=this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
   const index = [];
  this.setState({files:e.target.files}) //puting images in state
   for(var i =0; i<e.target.files.length;i++){ // giving images id in state
    index.push(i);
   }
   this.setState({id:index});
  }
  onClick(e){
    var images = []; // array for preview images
    var id = [];
    for(var i = 0; i<this.state.files.length; i++){
      if(e.target.id == this.state.id[i]){  //skipping pic that is target for deleting and not putting it in array to preview images
       continue;
      }
      images.push(this.state.files[i]);
      id.push(this.state.id[i]);
    }
    this.setState({files:images,id:id});//updating state, without image that should be deleted 
    
  }
  render(){
    
   const images = [];
   let imgUrl;
   var time1 = new Date(); //time before
    for(var i =0; i<this.state.files.length;i++){
      imgUrl = URL.createObjectURL(this.state.files[i]);  
      images.push(<img src={imgUrl} className="images" alt = "pic" id = {this.state.id[i]} onClick={(this.onClick)}/>);
    }
    var time2 = new Date(); //time after
  var processTime = (<p>Processing time: {time2-time1} ms.</p>);
    return (
      < form id = "form">
        <div>
          <h2 id = "header" >Multiple Image holder</h2>
          <p id = "upload">Upload as many images as you want!</p>
          <p id = "delete">Click on image to delete it!</p>
        </div>
        <div id ="buttonHolder">
          <input  type="file" id = "button" multiple onChange={(this.onChange)} /> 
          </div>
        <br></br>
        <div className="ImagesDiv">
          {images}
        </div>
        <div id = "process">
          {processTime}
        </div>
      </form>
    )
  }
}