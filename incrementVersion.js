/* 
    Read the .version.json file, and increment the count by 1.
*/

const fs = require('fs')
const filePath = './src/.version.json'
const versionObject = require(filePath)

const currentVersion = versionObject.version
console.log('currentVersion', currentVersion)

const nextVersion = currentVersion + 1
console.log(`Updating to version ${nextVersion}`)

versionObject.version = nextVersion

fs.writeFile(filePath, JSON.stringify(versionObject), (err, res) => {
    if(err) {
        console.log('Something went wrong with versioning!')
        process.exit(1)
    } else {
        console.log(`Updated to version ${nextVersion}`)
        process.exit(0)
    }
})