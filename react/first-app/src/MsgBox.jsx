

function MsgBox({username, textcolor}) {
    let styles = {
        color: textcolor

    };
  return (
    <div className="msg-box">
     <h1 style={styles}>hello ,{username}</h1>
    </div>
  );
}
export default MsgBox;