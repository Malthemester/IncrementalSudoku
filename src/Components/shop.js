import "../styles/shop.css"

function buyUint(available, affordable, buttonName, title, cost, description){
    if (!available) {
        return
    }
    
    return(
        <button disabled={affordable} className="shopBT" type="button">{buttonName}
        <div className="tooltiptext"> 
            <div className="description">{title}</div>
            <div className="description">{cost.split(":")[0]}: <span className="price">{cost.split(":")[1]}</span></div>
            <div className="description">{description}</div>
        </div>
    </button>

    )
}

// <div className="description">{title}</div>
// <div className="description">4x4: <span className="price">2</span></div>
// <div className="description">sde</div>

export default function shop(props) {

    return (
        <div className="shop">
            <div className="shopHeder">
                Shop
            </div>

            {buyUint(true, false, "Clicker", "Buy a clicker for the progress bar", "4x4: 2", "It will click [1] a second")}
            
            {buyUint(true, false, "AI", "Buy a clicker for the progress bar", "4x4: 5", "It will click [1] a second")}

        </div>
    )
}