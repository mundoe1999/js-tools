import fs from "fs";
// Read input and output files
const args = process.argv.slice(2);
const inputFile = args[0] || "input.json"
const outputFile = args[1] || "output.csv"

// Method for creating necessary rows
const convertArrayToRow = (list) => list.join("|")+"\n"

var outputStream = fs.createWriteStream(outputFile)
outputStream.write("sep=|\n")
// Read input file name
fs.readFile(inputFile, (error, result) => {
  if(error) console.error(error)
  else {
    // todo: This assumes that the object being passed is an array. What if it's not?
    var parsedJson = JSON.parse(result.toString('utf-8'))

    // Get the keys and stores
    var keys = Object.keys(parsedJson[0])
    outputStream.write(convertArrayToRow(keys))
    
    // Minor optimization: Use a normal for-loop to reduce callback of forEach method
    parsedJson.forEach((item) => {
      let row = []
      for(let i = 0; i < keys.length; i++){
        row.push(item[keys[i]])
      }
      // Push Result to output file
      outputStream.write(convertArrayToRow(row))
    })
  }
})
