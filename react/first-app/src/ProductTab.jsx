import Product from "./Product";


function productTab() {
let styles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
} ;

    return(
        <div style={styles}>
       
        <Product title="iphone" price="20000"idx={0} />
         <Product title="ship" price="20000"  idx={1}/>
          <Product title="airoplan" price="20000"  idx={2}/>
           <Product title="bike" price="20000" idx={3}/>
        </div>
    );
}
export default productTab;