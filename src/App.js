import React from 'react';
import './App.css';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './Components/Navigation';
import Logo from './Components/Logo';
import FaceDetection from './Components/FaceDetection';



const app = new Clarifai.App({
  apiKey: '93e7b7bb5a16477591dbb0f9be440ae0'
});
// app.models.predict('face-detection', "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg").then(response => {
//     console.log("response", response)
//   }).catch(err => console.log("err", err));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalFaces: "-"
    }
  }

  setTotalFaces = (count) => {
    this.setState({ totalFaces: count });
  }

  render() {
    return <div className='app-container'>
      <ParticlesBg color="#e7eff9" type="circle" bg={true} style={{ position: "sticky" }} />
      <Navigation />
      <Logo totalFaces={this.state.totalFaces} />
      <FaceDetection setTotalFaces={this.setTotalFaces} />
    </div>
  }
}

export default App;
