import "../styles/resources.css"

function resourcesRow(value, name, valuePerSecond){

    if(value < 0)
        return

    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
            <td>{valuePerSecond}/m</td>
        </tr>
    )

}

export default function DisplayResources(props){
    
    return (
        <dis>
            <table className="resource">
                <tbody>
                    <th>Resources</th>
                    <th></th>
                    <th></th>
                    {resourcesRow(props.resources.x4,"4x4", props.resources.x4PM)}
                    {resourcesRow(props.resources.x9,"9x9",props.resources.x9PM)}
                    {resourcesRow(props.resources.x9,"9x9",props.resources.x9PM)}
                    {resourcesRow(props.resources.x9,"9x9",props.resources.x9PM)}
                </tbody>
            </table>
        </dis>
    )
}