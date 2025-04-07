
export const PdfEmbeed = ({url} : {
    url: string
}) => {
    return <div className="w-full h-screen">
        <div className="w-full h-full p-10">
            {/* <iframe className="w-full h-full" src={`https://docs.google.com/gview?url=${url}&embedded=true`}></iframe> */}
        <iframe className="w-full h-full" src={url}></iframe>
        </div>
        
    </div>
}
