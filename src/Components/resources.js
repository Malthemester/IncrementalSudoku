import "../styles/resources.css"

function resourcesRow(value, name, valuePerSecond, display) {

    if (!display)
        return

    return (
        <tr>
            <td>{name}</td>
            <td>{Number(value).toFixed(2)}</td>
            <td>{Number(valuePerSecond).toFixed(2)}/s</td>
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
                        return resourcesRow(resource.Value, resource.Name, resource.IncremenAmount, resource.Display)
                    })}

                </tbody>
            </table>
        </dis>
    )
}