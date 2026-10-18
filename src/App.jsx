import { useState } from 'react'
// updating the arrays
function App() {
  // To generate the numbers in an array
  const [array, setArray] = useState([])
  // To set how many bars to display
  const[size,setSize]=useState(30)
  // to set the speed of sorting algo
  const[speed,setSpeed]=useState(50)
  // selects the bubble sort algo
  const[algorithm,setalgorithm]=useState('bubble')
  // makes the drop down method
  const[sorting,setSorting]=useState(false)
  // indices currently being compared
  const [comparing, setComparing] = useState([])      
  // indices confirmed in final position
  const [sortedIndices, setSortedIndices] = useState([])


// to generate new array
  function generateArray(size) {
    const newArray = []
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 350) + 10)
    }
    // intializing the array with setarray
    setArray(newArray)
    setComparing([])
    setSortedIndices([])
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
      // comparing these 2 index
      setComparing([j,j+1])
      await wait(101-speed)
      if(arr[j]>arr[j+1]){
          let temp=arr[j]
          arr[j]=arr[j+1]
          arr[j+1]=temp
          setArray([...arr])
          await wait(101-speed)
      }}
      // locked position 
      setSortedIndices(prev=>[...prev,n-i-1])
  }
  // last element sorted making it green
  setSortedIndices(prev=>[...prev,0])
  setComparing([])
  }
// insertion sort
async function insertionSort() {
  let arr=[...array]
  const n=arr.length;
  for(let i=1;i<n;i++){
    let key=arr[i]
    let j=i-1
    while(j>=0 && arr[j]>key){
      setComparing([j,j+1])
      arr[j+1]=arr[j]
      j--
      setArray([...arr])
      await wait(101-speed)
    }
    arr[j+1]=key
    setArray([...arr])
    await wait(101-speed)
  }
  // last element sorted so green
  setComparing([])
  // at the end all are sorted
  setSortedIndices(Array.from({length:n},(_,idx)=>idx))
  
}
// selection sort
async function selectionSort() {
  let arr=[...array]
  const n=arr.length
  for(let i=0;i<n-1;i++){
    let minIdx=i
    for(let j=i+1;j<n;j++){
      setComparing([i,j])
      await wait(101-speed)
      if(arr[j]<arr[minIdx]){
        minIdx=j
      }
    }
    if(minIdx!==i){
      let temp=arr[i]
      arr[i]=arr[minIdx]
      arr[minIdx]=temp
      setArray([...arr])
      await wait(101-speed)
    }
    setSortedIndices(prev=>[...prev,i])
  }
  setSortedIndices(prev=>[...prev,n-1])
  setComparing([])
}
// merge sort
async function mergeSort() { //async function bcz delay in motion
  let arr = [...array]
  await mergeSortHelper(arr, 0, arr.length - 1)
  setComparing([])
  setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx)) //for indexes
}

async function mergeSortHelper(arr, left, right) {//division of array
  if (left >= right) return                 // base case: 0 or 1 element
  const mid = Math.floor((left + right) / 2)
  await mergeSortHelper(arr, left, mid)     // sort left half
  await mergeSortHelper(arr, mid + 1, right) // sort right half
  await merge(arr, left, mid, right)        // merge the two sorted halves
}

async function merge(arr, left, mid, right) {
  const leftPart = arr.slice(left, mid + 1)
  const rightPart = arr.slice(mid + 1, right + 1)
  let i = 0, j = 0, k = left

  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] <= rightPart[j]) {
      arr[k] = leftPart[i]
      i++
    } else {
      arr[k] = rightPart[j]
      j++
    }
    setComparing([k])
    setArray([...arr])
    await wait(101 - speed)
    k++
  }

  while (i < leftPart.length) {
    arr[k] = leftPart[i]
    i++
    setComparing([k])
    setArray([...arr])
    await wait(101 - speed)
    k++
  }

  while (j < rightPart.length) {
    arr[k] = rightPart[j]
    j++
    setComparing([k])
    setArray([...arr])
    await wait(101 - speed)
    k++
  }
}

// quick sort
async function quickSort() {
  let arr = [...array]
  await quickSortHelper(arr, 0, arr.length - 1)
  setComparing([])
  setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx))
}

async function quickSortHelper(arr, low, high) {
  if (low >= high) return
  const pivotIndex = await partition(arr, low, high)
  await quickSortHelper(arr, low, pivotIndex - 1)
  await quickSortHelper(arr, pivotIndex + 1, high)
}

async function partition(arr, low, high) {
  const pivot = arr[high]          // last element is the pivot
  let i = low - 1

  for (let j = low; j < high; j++) {
    setComparing([j, high])
    await wait(101 - speed)
    if (arr[j] < pivot) {
      i++
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      setArray([...arr])
      await wait(101 - speed)
    }
  }

  // put pivot in its final position
  let temp = arr[i + 1]
  arr[i + 1] = arr[high]
  arr[high] = temp
  setArray([...arr])
  setSortedIndices(prev => [...prev, i + 1])   // pivot is now locked in place
  await wait(101 - speed)

  return i + 1
}


// locking a specific sorting
async function startSort() {
    setSorting(true)          // lock UI
    if (algorithm === 'bubble') await bubbleSort()
    if (algorithm === 'insertion') await insertionSort()
    if (algorithm === 'selection') await selectionSort()
    if (algorithm === 'merge') await mergeSort()
    if (algorithm === 'quick') await quickSort()
    setSorting(false)         // unlock UI
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
        <button onClick={startSort} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Start Sort
        </button>
         <select
          value={algorithm}
          onChange={(e) => setalgorithm(e.target.value)}
          disabled={sorting}
          className="bg-slate-700 px-3 py-2 rounded disabled:opacity-40"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
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
        {array.map((value, index) => {
          // default color
          let color='bg-blue-300'
          if (comparing.includes(index)) color = 'bg-yellow-400'
          if (sortedIndices.includes(index)) color = 'bg-green-400'
        return (
          // for each elemnt u have to create a div
          <div
            key={index}
            className={`${color} w-4`}
            // make height of the bars equal to the no.s in px
            style={{ height: `${value}px` }}
          ></div>
        )})}
      </div>
    </div>
  )

}
export default App