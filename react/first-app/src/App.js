import logo from './logo.svg';
import './App.css';


 //named export
// import DogCard from './dogcard'; //defult export
// import {DogCard} from './dogcard'; //named export
// import {DogCard, Images} from './dogcard'; //named export

import  {DogCard} from './dogcard';
import Image from './Image';
import Counter from './Counter';

function App() {
  return (
    <div className="App">
  
      {/* <DogCard name="dog1" image="https://images.pexels.com/photos/30133499/pexels-photo-30133499.jpeg"/>
      <DogCard  name="dog2" image="https://images.pexels.com/photos/7678426/pexels-photo-7678426.jpeg"/> */}
      
      <Counter />


    </div>
  );
}

export default App;


