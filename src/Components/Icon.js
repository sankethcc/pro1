export default function Icon(props){
    return(
        <div className="products">
        <img src={props.icon} alt="product" />
        <p>{props.name}</p>
        </div>
    )
}