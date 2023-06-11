export default function Icon(props){
    return(
        <div className="products">
        <img src={props.icon} />
        <p>{props.name}</p>
        </div>
    )
}