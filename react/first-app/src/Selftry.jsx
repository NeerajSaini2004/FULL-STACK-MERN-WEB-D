
//event handling in react

function HandlingCLICK() {
    console.log("hello world");
}
function PrintUniverse() {
    console.log("I love you universe");
}

export default function Button() {
    return (
        <div>
            <button onClick={HandlingCLICK}>Click Me</button>

            <p onMouseOver={PrintUniverse}>I love you universe </p>
        </div>
        
       
    );
}
