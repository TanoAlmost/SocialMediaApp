// type={props.type} Te trae type="submit" del Button (Login) 
// {props.children} Te trae el Texto del Button (Login) 

function LikesButton(props) {
    return <button className="likes-button" type={props.type} onClick={props.onClick}>{props.children}</button>

}

export default LikesButton