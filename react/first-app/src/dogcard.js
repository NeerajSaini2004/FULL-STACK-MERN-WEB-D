import e from "cors";
import Image from './Image'; //named export


export function DogCard( props) {
  let title = "Dog Name";
  return (
    <div>
      {/* <h3>Dog Name</h3>
        <Image /> */}
       <h3 style={{fontSizze:'10px',color:'red'}}>
        {title}

      </h3>
        <h3>{props.name}</h3>
        <Image src={props.image} />
     
    </div>
  );
}
// export default DogCard;

