import searchIcon from '../assets/searchIcon.png'

export default function SearchBar ( { handleSearchSubmit } ) {

    const radius = 30
    const height = 25
    const offset = 11


    function handleFocus(event) {
        event.target.style.border = 'none'
        event.target.style.outline = 'none'
    }

    function shiftFocus() {
        document.getElementById('gene-search').focus()
    }

    // const species = ['Homo sapiens', 'Mus musculus', 'Pan troglodyte', 'Danio rerio', 'Arabidopsis thaliana']



    return (
        <form onSubmit={handleSearchSubmit} autoComplete='off'>
            <div style={{height: height, width: 200, backgroundColor: 'white', borderRadius: radius, marginLeft: 30, display: 'flex', flexDirection: 'row', position: 'relative', zIndex: 3 }}>
                <img src={searchIcon} style={{ height: height+offset, marginTop: -offset/2, borderRadius: radius }} alt='search icon'/>
                <input id='gene-search' type='text' placeholder='FOXP2...' style={{ height: height-2, width: 100, backgroundColor: 'white', borderRadius: radius, border: 'none' }} onFocus={(event) => handleFocus(event)}></input>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: 35, marginLeft: 22 }}>
                    <select title='species' id="species-select" onChange={shiftFocus} style={{ width: 20, border: 'none', color: 'grey' }} onFocus={handleFocus}>
                        <option style={{ color: 'black' }}>Homo sapiens</option>
                        <option style={{ color: 'black' }}>Mus musculus</option>
                        <option style={{ color: 'black' }}>Pan troglodytes</option>
                        <option style={{ color: 'black' }}>Danio rerio</option>
                        <option style={{ color: 'black' }}>Arabidopsis thaliana</option>
                    </select>
                </span>
            </div>
        </form>
    )
}

