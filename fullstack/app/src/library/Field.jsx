import Label from "./Label";
import Input from "./Input";

function Field(props) {
    const { id, type, value, onChange, placeholder, children } = props; // Extraer `children` para que no se pase a `Input`

    return (
        <>
            <Label forId={id}>{children}</Label>
            <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
        </>
    );
}

export default Field;