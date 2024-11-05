import Label from "./Label";
import Input from "./Input";

//  <> Fragmento </>

function Field(props) {

    return <>
        <Label forId={props.id}>{props.children}</Label>
        <Input id={props.id} type={props.type || "text"}/>
    </>
}

export default Field