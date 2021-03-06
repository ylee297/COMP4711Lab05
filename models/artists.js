let fs = require('fs');
let db = require('../util/database');
let sql = require('mssql');


function addArtist(newArtist) {
    try {
        fs.readFile('data.json', function (err, data) {
            var json = JSON.parse(data);
            json.push(newArtist);
            fs.writeFile('data.json', JSON.stringify(json), function (err) {
                if (err) throw err;
            });
        });
    } catch (error) {
        console.error('Error:', error)
    }
}
function deleteArtist(index) {
    try {
        fs.readFile('data.json', function (err, data) {
            var json = JSON.parse(data);
            json.splice(index,1);
            fs.writeFile('data.json', JSON.stringify(json), function (err) {
                if (err) throw err;
            });
        });
    } catch (error) {
        console.error('Error:', error)
    }
}

function getSearchedIndexes(query) {
    let indexArray = new Array();
    
    let data=fs.readFileSync('data.json')
    let artists = JSON.parse(data);
    for(let i = 0; i < artists.length; i++){
        if(artists[i].name.search(query)>=0){
            indexArray.push(i);
        }
    }
    return indexArray;
}



/* -------------------------------------------- */
module.exports = {
    add : addArtist,
    getIndexes : getSearchedIndexes,
    del : deleteArtist
}