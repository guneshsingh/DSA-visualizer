import { useState } from 'react'
// updating the arrays
function App() {
  const [array, setArray] = useState([])
// to generate new array
  function generateArray(size) {
    const newArray = []
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 350) + 10)
    }
    // intializing the array with setarray
    setArray(newArray)
  }
// React displays after below return statement
  return (
    <div className="bg-slate-800 text-white text-center font-sans min-h-screen pt-6">
      <h1 className="text-3xl font-bold mb-4">Sorting Visualizer </h1>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <button
        // () => this is array function i.e generates the arrays
          onClick={() => generateArray(30)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Generate New Array
        </button>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Start Sort
        </button>
      </div>
      {/* bars part */}
      <div className="flex items-end justify-center h-96 gap-[2px]">
        {array.map((value, index) => (
          // for each elemnt u have to create a div
          <div
            key={index}
            className="bg-blue-300 w-4"
            // make height of the bars equal to the no.s in px
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App