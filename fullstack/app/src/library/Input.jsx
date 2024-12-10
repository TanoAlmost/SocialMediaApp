function Input(props) {
    console.log('Input props:', props); // Depuración de props
    return <input className="input" {...props} />;
}

export default Input;