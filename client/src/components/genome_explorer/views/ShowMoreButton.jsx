
export default function ShowMoreButton( { setSelectedRegion, selectedRegion, visibility } ) {

    function handleShowMore() {
        setSelectedRegion([selectedRegion[0], selectedRegion[1]+10000])
    }

    return (
        <button onClick={handleShowMore} style={{ visibility: visibility, display: 'flex', marginBottom: 100 }}>Show More</button>
    )
}