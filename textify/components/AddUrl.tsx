'use client'
export const AddUrl = () => {
    
    function handleClick() {

    }

    return <div className="mt-10">
        <input type='text' placeholder="Add url of your documents" className="border rounded-md px-2 w-xl py-2"></input>
        <button onClick={handleClick} className="bg-black text-white  rounded-xl px-3 py-2 ml-2">submit</button>
    </div>
}