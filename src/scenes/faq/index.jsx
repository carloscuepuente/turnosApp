import React from 'react'

export default function index() {
    const borrarLocalStorage = () => {
        localStorage.clear()
    }


    return (
        <div>index
            <button onClick={borrarLocalStorage}>borrar el localStorage</button>

        </div>
    )
}
