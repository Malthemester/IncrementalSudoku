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

    Id
    Use

    PriceFunc = () => { }
    ClickFun = () => { }
    IncremenAmount = () => { }

    PriceNumber = () => {
        let purchaseAmount = LoadResources(this.Id + this.Name)
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
            let key = this.DontUseId ? prior : this.Id + prior
            let tempPurchase = LoadResources(key)

            if (tempPurchase <= 0) {
                ready = false
            }
        })

        if (ready)
            this.Available = true

    }

    IsPurchase = () => {

        let tempPurchase = LoadResources(this.Id + this.Name)

        if (tempPurchase >= this.MaxTimesPurchase) {
            this.Available = false
        }
    }
}

export function shopItems() {
    return [
        new Item(true, false,
            "Clicker",
            "Buy a clicker for the progress bar",
            "It will click ones a second",
            [["4x4", 11]], [11],1,
            [""],
            (startPrice) => startPrice,
            () => true),

        new Item(false, false,
            "Clicker Speed",
            "Upgrade the clickers speed",
            `The clicker vill click [] faster`,
            [["4x4", 15]], [15], 36,
            ["Clicker"],
            (startPrice, count) => Math.floor(startPrice + Math.pow(count, 1.2)),
            (count) => 1000 - (Math.log2(count + 1) * 190),
            "The clicker vill click [", "]ms faster"),

        new Item(false, false,
            "Clicker strength",
            "Upgrade the clickers strength",
            "It will click [] stronger",
            [["4x4", 20]], [20], 20,
            ["Clicker", "Clicker Speed"],
            (startPrice, count) => Math.floor(startPrice + Math.pow(count, 1.3)),
            (count) => 2 + count,
            // (count) => 1.13 + (Math.log2(count + 2.5) * 2.1) - 1,
            "Clicks vill click [", "] stronger"),

        new Item(false, false,
            "Highlighter",
            "Highlight the next solved fild",
            "",
            [["4x4", 20]], [20], 1,
            ["Clicker"],
            (startPrice) => startPrice,
            () => true),

        new Item(false, false,
            "Auto Completer",
            "The sudoku vil now auto complete",
            "",
            [["4x4", 30], ["9x9", 15]], [30, 15], 1,
            ["Clicker", "Clicker Speed", "Clicker strength"],
            (startPrice) => startPrice,
            () => true),

        new Item(false, false,
            "Increase points",
            "Increase Points from this sudoku",
            "It will increase the points gaind by []",
            [["4x4", 80], ["9x9", 20]], [80,20], 10,
            ["Clicker", "Clicker Speed", "Auto Completer"],
            (startPrice, count) => Math.round(startPrice + Math.pow((count * 30), (1.3))),
            (count) => count + 1,
            "It will increase the points gaind by [", "]")
    ]
}

export function gobalShopItems() {

    let new9x9 = new Item(false, false,
        "9x9 Sudoku",
        "Buy a 9x9 sudoku",
        "With this you can earn 9x9",
        [["4x4", 50]], [50], 1,
        ["1#Clicker strength"],
        (startPrice) => startPrice,
        () => true)

    new9x9.DontUseId = true

    return [new9x9]
}

function buyUint(item) {
    if (!item.Available) {
        return
    }

    return (
        <button disabled={!item.Affordable} onClick={() => item.ClickFun(item.Costs, item.Name, item.MaxTimesPurchase, item.Id)} className="shopBT" type="button">{item.Name}
            <div className="tooltiptext">
                <div className="description">{item.Title}</div>
                <div className="description">{item.CostText()}</div>
                <div className="description">{item.Description}</div>
            </div>
        </button>
    )
}

function DynamicDescription(item) {
    let purchaseAmount = LoadResources(item.Id + item.Name)
    let number = item.IncremenAmount(purchaseAmount + 1) - item.IncremenAmount(purchaseAmount)
    number = Math.abs(number.toFixed(2))

    return `${item.Text1}${number}${item.Text2}`
}

export function Shop(props) {

    let thisShopItems = props.items

    const [Shop, SetShop] = useState(thisShopItems)

    return (
        <div className="shop">
            <div className="shopHeder">
                {props.name}
            </div>

            {Shop.map(shopItem => {

                shopItem.Id = props.id

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