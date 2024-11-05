// type={props.type} Te trae type="submit" del Button (Login) 
// {props.children} Te trae el Texto del Button (Login) 

function Button(props) {
    return <button className="button" type={props.type} onClick={props.onClick}>{props.children}</button>

}

export default Button