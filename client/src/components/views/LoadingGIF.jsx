
export default function LoadingGIF ( { iconVisibility, dnaContainerSize } ) {

    return (
        <div id="loading" style={{ visibility: iconVisibility, position: 'fixed', zIndex: 1, height: '100%', width: `${dnaContainerSize-10}%`, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-bar-animated-gif-transparent-background-6.gif" alt="loading animation" style={{ height: '30%', marginTop: 210, marginRight: '2%' }}/>
        </div>
    )
}