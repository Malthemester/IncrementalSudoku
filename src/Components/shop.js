import { useState, useEffect } from "react"
import { LoadResources } from "../HelperFunctions/saveValue"
import "../styles/shop.css"
// import {Purchase} from '../Components/complete'

class Item {
    constructor(available, affordable, name, title, description, costs, maxTimesPurchase) {
        this.Available = available
        this.Affordable = affordable
        this.Name = name
        this.Title = title
        this.Description = description
        this.Costs = costs
        this.MaxTimesPurchase = maxTimesPurchase
    }

    ClickFun = () => { }

    CostText = () => {
        let costText = []

        this.Costs.forEach(price => {
            costText.push(<span>{price[0]}: <span className="price"> {price[1]}</span><br /></span>)
        });
        return costText
    }

    IsAffordable = (resources) => {
        let affordable = true
        this.Costs.forEach(price =>{
            if (resources.find(resource => resource.Name == price[0]).Value < price[1]){
                affordable = false
            }
        })
        this.Affordable = affordable
    }

    IsPurchase = () => {
    
    let tempPurchase = LoadResources(this.Name)

        if (tempPurchase >= this.MaxTimesPurchase){
            this.Available = false
        }
    }

}

const shopItems = [
    new Item(true, false,
        "Clicker",
        "Buy a clicker for the progress bar",
        "It will click ones a second",
        [["4x4", 1]], 1),

    new Item(true, false,
        "Clicker Speed",
        "Upgrade the clickers speed",
        "It will click faster",
        [["4x4", 3]], 5),

    new Item(false, false,
        "Clicker sterngth",
        "Upgrade the clickers sterngth",
        "It will click stronger",
        [["4x4", 50], ["9x9", 1]], 3)

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
        <button disabled={!item.Affordable} onClick={() => item.ClickFun(item.Costs)} className="shopBT" type="button">{item.Name}
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

    return (
        <div className="shop">
            <div className="shopHeder">
                Shop
            </div>

            {Shop.map(shopItem => {

                let pruchaseFunc = props.pruchaseFuncs.find(pruchaseFunc => pruchaseFunc.Name == shopItem.Name)
                
                if(pruchaseFunc != undefined)
                    shopItem.ClickFun = pruchaseFunc.Func

                shopItem.IsAffordable(props.resources)
                shopItem.IsPurchase()

                return buyUint(shopItem)
            })}

        </div>
    )
}