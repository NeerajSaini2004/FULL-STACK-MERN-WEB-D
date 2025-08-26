import logo from './logo.svg';
import './App.css';


 //named export
// import DogCard from './dogcard'; //defult export
// import {DogCard} from './dogcard'; //named export
// import {DogCard, Images} from './dogcard'; //named export

import  {DogCard} from './dogcard';
import Image from './Image';
import Counter from './Counter';

import Avatar from './Avatar';

function App() {
  return (
    <div className="App">
  
      {/* <DogCard name="dog1" image="https://images.pexels.com/photos/30133499/pexels-photo-30133499.jpeg"/>
      <DogCard  name="dog2" image="https://images.pexels.com/photos/7678426/pexels-photo-7678426.jpeg"/> */}
      
      {/* <Counter /> */}
      <Avatar
       src="https://images.pexels.com/photos/30133499/pexels-photo-30133499.jpeg"
        width={200} height={200} 
        />

      <Avatar
       src="https://th.bing.com/th/id/R.5c6bd1c31d48eeaa3ec2e55951f08e58?rik=WKxv7LskuT49Cw&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f35800000%2fPuppy-dogs-35894603-1920-1200.jpg&ehk=2b0h3p5A8qcSr%2ftB6EGud0cO2SLHMhOGl0z%2bd%2bmf2F8%3d&risl=&pid=ImgRaw&r=0"
        width={200} height={200} 
         />

    </div>
  );
}

export default App;


