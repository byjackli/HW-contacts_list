function Confirm(props) {
    return <div className="card">
        <p>Are you sure you want to delete <span>{props.firstName} {props.lastName}</span> from your contacts?</p>
        <div>
            <button>nevermind</button>
            <button>delete forever</button>
        </div>
    </div>
}

export default Confirm