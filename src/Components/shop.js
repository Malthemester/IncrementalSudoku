import { useState, useEffect } from "react"
import "../styles/shop.css"
// import {Purchase} from '../Components/complete'

class item {
    constructor(available, affordable, name, title, description, costs) {
        this.Available = available
        this.Affordable = affordable
        this.Name = name
        this.Title = title
        this.Description = description
        this.Costs = costs
    }

    ClickFun = () => { }

    CostText = () => {
        let costText = []

        this.Costs.forEach(price => {
            costText.push(<span>{price[0]}: <span className="price"> {price[1]}</span><br /></span>)
        });
        return costText
    }
}

const shopItems = [
    new item(true, false,
        "Clicker",
        "Buy a clicker for the progress bar",
        "It will click ones a second",
        [["4x4", 2]]),
    // ClickFun = Purchase,

    new item(true, true,
        "Clicker Speed",
        "Upgrade the clickers speed",
        "It will click faster",
        [["4x4", 3], ["9x9", 1]]),

    new item(false, false,
        "Clicker sterngth",
        "Upgrade the clickers sterngth",
        "It will click stronger",
        [["4x4", 3]])

    // clicker_speed: false,
    // clicker_strength: false,

    // increasePointsOn4x4: false,
    // increasePointsOn9x9: false,

    // simpleAI: false,
    // simpleAI_amount: false,
    // simpleAI_speed: false,

    // New4x4: false,
    // New9x9: false
    // Auto complet
]

function buyUint(item) {
    if (!item.Available) {
        return
    }

    return (
        <button disabled={item.Affordable} onClick={() => item.ClickFun()} className="shopBT" type="button">{item.Name}
            <div className="tooltiptext">
                <div className="description">{item.Title}</div>
                <div className="description">{item.CostText()}</div>
                <div className="description">{item.Description}</div>
            </div>
        </button>
    )
}

export default function Shop(props) {

    const [Shop, SetShop] = useState(shopItems)

    useEffect(() => {
    }, [])

    return (
        <div className="shop">
            <div className="shopHeder">
                Shop
            </div>

            {Shop.map(shopItem => {

                let pruchaseFunc = props.pruchaseFuncs.find(pruchaseFunc => pruchaseFunc.Name == shopItem.Name)
                
                if(pruchaseFunc != undefined)
                    shopItem.ClickFun = pruchaseFunc.Func

                return buyUint(shopItem)
            })}

            {/* {buyUint(true, false, "Clicker", "Buy a clicker for the progress bar", "4x4: 2", "It will click [1] a second")} */}

            {/* {buyUint(true, false, "AI", "Buy a clicker for the progress bar", "4x4: 5", "It will click [1] a second")} */}

        </div>
    )
}