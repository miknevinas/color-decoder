// Reconstruct hex array into string
const constructHexStr = arr => {
	let colorStr = '#'
  for (let i = 0; i < arr.length; i++) {
		colorStr = colorStr + arr[i]
  }
  return colorStr
}


// Deconstruct hex string into array
const getHexArr = data => {
	let color = data.slice(1)
	let colorArr = []
	for (let i = 0; i < color.length; i++) {
    if (i % 2 === 0) colorArr.push(color[i] + color[i+1])
  }
  return colorArr
}


const decode = async email => {
	// Fetch data
 	const response = await fetch('https://eworldes-color-mixer.cyclic.app/colors/:' + email)
	const data = await response.json()
  
  // Set hex arrays
  const color1Arr = getHexArr(data.color1)
  const color2Arr = getHexArr(data.color2)
  const mixedArr = []
  const secretArr = []
  
  // Compute mixed hex
  for (let i = 0; i < color1Arr.length; i++) {
    let avg = (parseInt(color1Arr[i], 16) + parseInt(color2Arr[i], 16)) / 2
    mixedArr.push(Math.floor(avg).toString(16))
  }
  
  // Compute secret hex
  for (let i = 0; i < mixedArr.length; i++) {
    let invert = 255 - parseInt(mixedArr[i], 16)
    secretArr.push(Math.floor(invert).toString(16))
  }
  
  // Get new hex strings
  const mixedColor = constructHexStr(mixedArr)
  const secretColor = constructHexStr(secretArr)
  
  // Set HTML elements
  document.getElementById("circle-1").style.backgroundColor = data.color1
  document.getElementById("label-1").innerHTML = data.color1
  document.getElementById("circle-2").style.backgroundColor = data.color2
  document.getElementById("label-2").innerHTML = data.color2
  document.getElementById("circle-mixed").style.backgroundColor = mixedColor
  document.getElementById("label-mixed").innerHTML = mixedColor
  document.getElementById("circle-secret").style.backgroundColor = secretColor
  document.getElementById("label-secret").innerHTML = secretColor
  
}

decode("example2@gmail.com");