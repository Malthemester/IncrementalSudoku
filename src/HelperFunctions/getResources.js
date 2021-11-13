import { SaveResources, LoadResources } from "./saveValue";

function CollectResources(key, value){

    let curValue = LoadResources(key)
    curValue = curValue + value
    SaveResources(key, curValue)
    
    return curValue
}


export{CollectResources}