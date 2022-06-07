function Icon(props) {
    return <span className="icon">
        <span className={`material-icons ${props.art}`} aria-hidden>{props.art}</span>
        <span>{props.title}</span>
    </span>
}

export default Icon