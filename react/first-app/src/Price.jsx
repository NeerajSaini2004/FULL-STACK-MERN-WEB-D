export default function Price({oldprice , newprice}) {
   let oldstyles = {
    textDecoration: "line-through",
    color: "red"
   };
   let newstyles = {
    color: "green",
    fontWeight: "bold"
   };

   let styles = {
    backgroundColor: "lightgrey",
    height: "40px",
    borderBottom: "2px solid grey",
     
   }
   
    return(

        <div style={
            styles
        } >
         
             
              <span style={oldstyles}>{oldprice}</span>
              &nbsp; &nbsp;
                <span>{newprice}</span>
              
        </div>
    );
}