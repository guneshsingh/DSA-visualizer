import { useState } from 'react'
// updating the arrays
function App() {
  // To generate the numbers in an array
  const [array, setArray] = useState([])
  // To set how many bars to display
  const[size,setSize]=useState(30)
  // to set the speed of sorting algo
  const[speed,setSpeed]=useState(50)
// to generate new array
  function generateArray(size) {
    const newArray = []
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 350) + 10)
    }
    // intializing the array with setarray
    setArray(newArray)
  }
// to change the size of array
  function handleSizeChange(e) {
    const newSize=Number(e.target.value)
    // changed the size
    setSize(newSize)
    // passed to generate the new sized array
    generateArray(newSize)
  }
// to change the speed of algo
  function  handleSpeedChange(e) {
    const newSpeed=Number(e.target.value)
    setSpeed(newSpeed)
  }
// to slow down the animation
function wait(ms) {
  return new Promise((resolve)=>setTimeout(resolve,ms))
}
// bubble sort
async function bubbleSort() {
  let arr=[...array]
  const n=arr.length
  for(let i=0;i<n-1;i++){
    for(let j=0;j<n-1-i;j++){
      if(arr[j]>arr[j+1]){
          let temp=arr[j]
          arr[j]=arr[j+1]
          arr[j+1]=temp
          setArray([...arr])
          await wait(101-speed)
      }}
  }
  }

// React displays after below return statement
  return (
    <div className="bg-slate-800 text-white text-center font-sans min-h-screen pt-6">
      <h1 className="text-3xl font-bold mb-4">Sorting Visualizer </h1>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <button
        // () => this is array function i.e generates the arrays
          onClick={() => generateArray(size)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Generate New Array
        </button>
        <button onClick={bubbleSort} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Start Sort
        </button>
      <label className='flex items-center gap-2'>
        Size: {size}
        <input 
          type="range" 
          min="5"
          max="100"
          value={size}
          onChange={handleSizeChange}
        />
      </label>
      
      <label className='flex items-center gap-2'>
        Speed: {speed}
        <input 
          type="range" 
          min="1"
          max="100"
          value={speed}
          onChange={handleSpeedChange}
        />
      </label>
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