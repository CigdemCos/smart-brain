import React, {Component} from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Origin from "./components/Origin/Origin";
import './App.css';


const particlesOptions={
        particles: {
         /* line_linked: {
             shadow: {
              enable: true,
              color: "#3CA9D1",
              blur: 5
                }
             }*/
             number:{
              value:70,
              density:{
                enable: true,
                value_area: 800
              }
             }
           }
        }

  const initialState={
      input:'',
      imageUrl:'',
      box:{},
      analyze: {},
      route:'signin',
      isSignedIn: false,
      user: {
        id:'',
        name:'',
        email:'',
        entries: 0,
        joined: ''
      }
    }

       
class App extends Component{
  constructor(){
    super();
    this.state=initialState;
  }//const


  loadUser = (data)=>{
    this.setState({user:{
        id: data.id,
        name:data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }


   analyzeData= (data) => {
    const age = data.outputs[0].data.regions[0].data.concepts[0].name;
    const gender = data.outputs[0].data.regions[0].data.concepts[20].name;
    const appearance = data.outputs[0].data.regions[0].data.concepts[22].name;
    const appearancePercent = Math.round (data.outputs[0].data.regions[0].data.concepts[22].value.toFixed(2) * 100);
    const appearance2 = data.outputs[0].data.regions[0].data.concepts[23].name;
    const appearancePercent2 = Math.round (data.outputs[0].data.regions[0].data.concepts[23].value.toFixed(2) * 100);
    const appearance3 = data.outputs[0].data.regions[0].data.concepts[24].name;
    const appearancePercent3 = Math.round (data.outputs[0].data.regions[0].data.concepts[24].value.toFixed(2) * 100);
    const appearance4 = data.outputs[0].data.regions[0].data.concepts[25].name;
    const appearancePercent4 = Math.round (data.outputs[0].data.regions[0].data.concepts[25].value.toFixed(2) * 100);
    const appearance5 = data.outputs[0].data.regions[0].data.concepts[26].name;
    const appearancePercent5 = Math.round (data.outputs[0].data.regions[0].data.concepts[26].value.toFixed(2) * 100);
    const appearance6 = data.outputs[0].data.regions[0].data.concepts[27].name;
    const appearancePercent6 = Math.round (data.outputs[0].data.regions[0].data.concepts[27].value.toFixed(2) * 100); 
    const appearance7 = data.outputs[0].data.regions[0].data.concepts[28].name;
    const appearancePercent7 = Math.round (data.outputs[0].data.regions[0].data.concepts[28].value.toFixed(2) * 100);

    return {
      age,
      gender,
      appearance,
      appearancePercent,
      appearance2,
      appearancePercent2,
      appearance3,
      appearancePercent3,
      appearance4,
      appearancePercent4,
      appearance5,
      appearancePercent5,
      appearance6,
      appearancePercent6,
      appearance7,
      appearancePercent7
    };
  };

   displayData = (analyze) => {
    this.setState({ analyze: analyze });
  };


  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height=Number(image.height);
   // console.log(width,height);
   return{ 
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
   }
  }

  displayFaceBox = (box) => {
   // console.log(box);
    this.setState({box: box})
  }

  onInputChange=(event)=>{
    //console.log(event);
    //console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit=()=>{ //better name onPictureSubmit()
    //console.log('click');
    this.setState({imageUrl: this.state.input}) 

     fetch('https://blooming-fjord-39123.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                 input: this.state.input 
                 })
            })
    .then(response => response.json()) 
    .then(response=>{
          if (response){// got a response from the API
            fetch('https://blooming-fjord-39123.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  //just send id
                 id: this.state.user.id 
                 })
            })
            .then(response => response.json())
            .then(count =>{
              this.setState(Object.assign(this.state.user, {entries: count} ))
            })
            .catch(console.log)
          }//if
          this.displayFaceBox(this.calculateFaceLocation(response));
           this.displayData(this.analyzeData(response));
    })

    .catch(err=>console.log(err));//if clarifai api fails
  
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      //this.setState({isSignedIn:false})
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn:true})
    }

    this.setState({route:route});
  }

  render(){
    const {isSignedIn, imageUrl, route, box} = this.state; //destructuring
    return(
      
      <div className="App">
         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
         
        { route==='home' && imageUrl
        ? ( <div>
          <Particles className='particles' 
              params={particlesOptions}
            />
           <Logo />
           <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />
           <Origin
              age={this.state.analyze.age}
              gender={this.state.analyze.gender}
              appearance={this.state.analyze.appearance}
              appearancePercent={this.state.analyze.appearancePercent}
              appearance2={this.state.analyze.appearance2}
              appearancePercent2={this.state.analyze.appearancePercent2}
              appearance3={this.state.analyze.appearance3}
              appearancePercent3={this.state.analyze.appearancePercent3}
              appearance4={this.state.analyze.appearance4}
              appearancePercent4={this.state.analyze.appearancePercent4}
              appearance5={this.state.analyze.appearance5}
              appearancePercent5={this.state.analyze.appearancePercent5}
              appearance6={this.state.analyze.appearance6}
              appearancePercent6={this.state.analyze.appearancePercent6}
              appearance7={this.state.analyze.appearance7}
              appearancePercent7={this.state.analyze.appearancePercent7}
            />
         <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>): route === "home" && !imageUrl ?
        ( <div>
          <Particles className='particles' 
              params={particlesOptions}
            />
           <Logo />
           <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />

        </div>

          ): route==='signin' || route==='signout' ?
        (
          <div>
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          </div>
            
           ) :(
           <div>
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
           </div>
          ) 
      }
        </div>
      );
  } 
}

export default App;
