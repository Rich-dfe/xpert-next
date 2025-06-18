function Zappy({currentCount, onIncrement, onDecrement }){
   
    return(
        <>
            <h2>Zappy</h2>
            <p className="text-amber-50">Count received from parent: {currentCount}</p>
            <div className="flex flex-row gap-4">
            <button onClick={onIncrement} className="bg-amber-300 border-2 p-3">Increment from child</button>
            <button onClick={onDecrement} className="bg-amber-700 border-2 p-3">Decrement from child</button>
            </div>
        </>
    )
}

export default Zappy