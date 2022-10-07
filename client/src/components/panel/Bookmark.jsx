import CollapsibleIcon from "./CollapsibleIcon"

export default function Bookmark ( { label, handleClick } ) {


    return (
        <div id="bookmark" style={{ height: 37, width: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <CollapsibleIcon handleClick={handleClick} label={label} />
            <span style={{ display: 'flex', fontSize: 17, marginLeft: 5, marginBottom: 1, fontWeight: 400 }}>{label}</span>
        </div>
    )
}