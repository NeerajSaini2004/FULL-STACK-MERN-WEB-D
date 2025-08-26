// function Image() {
    
//     return (
//         <div className="image-container">
//             <img src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg" alt="Dog" />
           
//         </div>
//     );
// }

// export default Image;

function Image( props ) {
    return (
        <div className="image-container">
            <img src={props.src}  style={{height:200,width:200}} />
        </div>
    );
}
export default Image;