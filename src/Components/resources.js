import "../styles/resources.css"

function resourcesRow(value, name, valuePerSecond, display) {

    if (!display)
        return

    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
            <td>{valuePerSecond}/m</td>
        </tr>
    )

}

export default function DisplayResources(props) {

    return (
        <dis>
            <table className="resource">
                <tbody>
                    <th>Resources</th>
                    <th></th>
                    <th></th>

                    {props.resources.map(resource => {
                        return resourcesRow(resource.Value, resource.Name, (resource.Interval / 1000) * resource.AmountPar, resource.Display)
                    })}

                </tbody>
            </table>
        </dis>
    )
}