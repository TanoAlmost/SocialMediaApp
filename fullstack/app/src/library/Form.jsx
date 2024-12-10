function Form(props) {
    console.log('Form children:', props.children);
    return <form className="form" onSubmit={props.onSubmit}>{props.children}</form>;
}

export default Form;