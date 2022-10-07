
export default function ShowMoreButton( { setSelectedRegion, selectedRegion, visibility } ) {

    function handleShowMore() {
        setSelectedRegion([0, selectedRegion[1]+10000])
    }

    return (
        <button onClick={handleShowMore} style={{ visibility: visibility, display: 'flex', marginBottom: 30 }}>Show More</button>
    )
}