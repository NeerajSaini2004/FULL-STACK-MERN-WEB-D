
import "./Product.css";
import Price from "./Price";
function Product({title ,idx}){

    let oldprice = ["122222","23333","34444"];
    let newprice = ["11111","22222","33333"];

    let description = [["this is iphone","thanku"],["this is ship","ssssssss"],["this is airoplan","yftdtd"] ,["this is bike","bikesss"]];
    return(
        <div className="product">
           <h1>{title}</h1>
           <p>{description[idx][0]}</p>
           <p>{description[idx][1]}</p>
              <Price  oldprice={oldprice[idx]}  newprice={newprice[idx]}/> 
            </div>
    );
}

export default Product;