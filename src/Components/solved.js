

export default function DesplaySolved(props) {
    return (
        <div>
            {props.solved &&
                <p>Win</p>
            }
        </div>
    )
}