import { useState, useEffect } from "react"
import { LoadResources } from "../HelperFunctions/saveValue"
import "../styles/shop.css"
// import {Purchase} from '../Components/complete'

class Item {
    constructor(available, affordable, name, title, description, costs,
        startCosts, maxTimesPurchase, priors, priceFunc, incremenAmount, text1, text2) {
        this.Available = available
        this.Affordable = affordable
        this.Name = name
        this.Title = title
        this.Description = description
        this.Costs = costs
        this.StartCosts = startCosts
        this.MaxTimesPurchase = maxTimesPurchase
        this.Priors = priors
        this.PriceFunc = priceFunc
        this.IncremenAmount = incremenAmount
        this.Text1 = text1
        this.Text2 = text2
    }

    PriceFunc = () => { }
    ClickFun = () => { }
    IncremenAmount = () => { }

    PriceNumber = () => {
        let purchaseAmount = LoadResources(this.Name)
        this.Costs.forEach((price, index) => {
            this.Costs[index] = [this.Costs[index][0], this.PriceFunc(this.StartCosts[index], purchaseAmount)]
        })
    }

    CostText = () => {
        let costText = []

        this.Costs.forEach(price => {
            costText.push(<span>{price[0]}: <span className="price"> {price[1]}</span><br /></span>)
        });
        return costText
    }

    IsAffordable = (resources) => {
        let affordable = true
        this.Costs.forEach(price => {
            if (resources.find(resource => resource.Name == price[0]).Value < price[1]) {
                affordable = false
            }
        })
        this.Affordable = affordable
    }

    IsAvailable = () => {

        let ready = true

        this.Priors.forEach((prior) => {
            let tempPurchase = LoadResources(prior)

            if (tempPurchase <= 0) {
                ready = false
            }
        })

        if (ready)
            this.Available = true

    }

    IsPurchase = () => {

        let tempPurchase = LoadResources(this.Name)

        if (tempPurchase >= this.MaxTimesPurchase) {
            this.Available = false
        }
    }
}

export const shopItems = [
    new Item(true, false,
        "Clicker",
        "Buy a clicker for the progress bar",
        "It will click ones a second",
        [["4x4", 1]], [1],
        1, [""],
        () => 1,
        () => 2),

    new Item(true, false,
        "Clicker Speed",
        "Upgrade the clickers speed",
        `The clicker vill click [] faster`,
        [["4x4", 3]], [3], 30, 
        ["Clicker"],
        (startPrice, count) => Math.floor(startPrice + Math.pow(count, 1.48)),
        (count) => 1000 - (Math.log2(count + 1) * 200),
        "The clicker vill click [", "] faster"),

    new Item(false, false,
        "Clicker strength",
        "Upgrade the clickers strength",
        "It will click [] stronger",
        [["4x4", 5]], [5], 20, 
        ["Clicker", "Clicker Speed"],
        (startPrice, count) => Math.floor(startPrice + Math.pow(count, 1.51)),
        (count) => (Math.log2(count + 2.3) * 2) - 1,
        "Clicks vill click [", "] stronger")

    // new Item(false, false,
    //     "Clicker strength",
    //     "Upgrade the clickers strength",
    //     "It will click [] stronger",
    //     [["4x4", 50], ["9x9", 1]], 3)


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
        <button disabled={!item.Affordable} onClick={() => item.ClickFun(item.Costs, item.Name, item.MaxTimesPurchase)} className="shopBT" type="button">{item.Name}
            <div className="tooltiptext">
                <div className="description">{item.Title}</div>
                <div className="description">{item.CostText()}</div>
                <div className="description">{item.Description}</div>
            </div>
        </button>
    )
}

function DynamicDescription(item) {
    let purchaseAmount = LoadResources(item.Name)
    let number = item.IncremenAmount(purchaseAmount + 1) - item.IncremenAmount(purchaseAmount)
    number = Math.abs(number.toFixed(2))

    return `${item.Text1}${number}${item.Text2}`
}

export function Shop(props) {

    const [Shop, SetShop] = useState(shopItems)

    return (
        <div className="shop">
            <div className="shopHeder">
                Shop
            </div>

            {Shop.map(shopItem => {

                let pruchaseFunc = props.pruchaseFuncs.find(pruchaseFunc => pruchaseFunc.Name == shopItem.Name)

                if (pruchaseFunc != undefined)
                    shopItem.ClickFun = pruchaseFunc.Func

                shopItem.IsAffordable(props.resources)
                shopItem.PriceNumber()

                shopItem.IsAvailable()
                shopItem.IsPurchase()
                
                if (shopItem.Text1)
                    shopItem.Description = DynamicDescription(shopItem)

                return buyUint(shopItem)
            })}

        </div>
    )
}