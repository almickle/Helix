
export default function Labels ( { labels } ) {


    const labelElements = labels.map((label) => {
        return (
            <label key={label} className="label" style={{ display: 'flex', alignItems: 'center', height: 'fit-content', justifyContent: 'flex-end', marginRight: 5, marginBottom: 10 }}>{label}</label>
        )
    })


    return (
        <div className="label" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', width: 'fit-content' }}>
            {labelElements}
        </div>
    )
}