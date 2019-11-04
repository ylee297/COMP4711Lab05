
let globalArtists = [];
let artistsLength = 0;


// current artist list
async function callArtistList(){
    globalArtists = [];
    const response = await fetch("../data")
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        data.forEach(function(oneArtist){
            globalArtists.push(oneArtist);
        });
        artistsLength = globalArtists.length;
    });

    let wrapper = document.getElementById('artists');
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
    if(artistsLength == 0){
        document.getElementById('directory').style.display = 'none';
    } else {
        document.getElementById('directory').style.display = 'block';
    }
    for(let i = 0; i < artistsLength; i++){
        createArtist(i);
    }

    return response;
}




let newArtistInfo = document.getElementsByClassName("newArtistInfo");
let x = document.getElementById("addArtistDiv");

//toggle add artist
function toggleAddMenu() {
    // let display = window.getComputedStyle(x, null).getPropertyValue("display");
    if (x.style.display === "none" || x.style.display === "") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

// add artist button
async function addition() {
    let artInfo = document.getElementsByClassName("newArtistInfo");
    
    const url = '/search/add'
    let newArtist = {"name": newArtistInfo[0].value, "disc": newArtistInfo[1].value, "img": newArtistInfo[2].value};

    const setting = {
        method: 'POST',
        body: JSON.stringify(newArtist),
        headers: {
            'Content-Type': 'application/json'
        }
    };


    await fetch(url, setting);
  

    x.style.display = "none";
    
    for(let i = 0; i < artInfo.length; i++){
        newArtistInfo[i].value = '';
    }
    callArtistList();
    
}
// delete artist button
async function deleteArtist(index){
    const url = '/search/delete'
    let deleteIndex = {"index" : index}
    const setting = {
        method: 'POST',
        body: JSON.stringify(deleteIndex),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(url, setting);
    // let storage = JSON.parse(localStorage.getItem('artistList'));
    // storage.splice(index, 1);
    // localStorage.setItem('artistList', JSON.stringify(storage));
    callArtistList();
}

// sort the result by letters typed in
async function searchQuery(){
    let query = document.getElementById("searchValue").value;
    const url = '/search/sortedSearch'
    let queryString = {"query" : query}
    const setting = {
        method: 'POST',
        body: JSON.stringify(queryString),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(url, setting);
    const data = response.json();
    let indexArray = new Array();
    await data.then(res => { indexArray = res.indexes});


    let wrapper = document.getElementById('artists');
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }

    for(let index of indexArray){
        createArtist(index);
    }

    return response;
}


//create a artist element in the list
function createArtist(index){
    let artists = globalArtists;
    let wrapper = document.getElementById('artists');

    let person = document.createElement("div");
    person.setAttribute("class", "person");
    
    let profilePics = document.createElement("div");
    profilePics.setAttribute("class", 'profilePics');
    let image = document.createElement("img");
    image.setAttribute("src", artists[index].img);
    profilePics.appendChild(image);

    let profileInfo = document.createElement("div");
    profileInfo.setAttribute("class", "profileInfo");
    let name = document.createElement("div");
    name.textContent = artists[index].name;
    let info = document.createElement("div");
    info.textContent = artists[index].disc; 
    name.setAttribute("id", "name");
    info.setAttribute("id", "info");
    profileInfo.appendChild(name);
    profileInfo.appendChild(info);


    let deleteDiv = document.createElement("div");
    deleteDiv.setAttribute("id", "deleteDiv");
    let button = document.createElement('Button');
    button.setAttribute("class", "deleteButton");
    button.textContent = "Delete";
    button.addEventListener("click", function(){
        deleteArtist(index);
    });
    deleteDiv.appendChild(button);

    person.appendChild(profilePics);
    person.appendChild(profileInfo);
    person.appendChild(deleteDiv);

    wrapper.appendChild(person);
}


callArtistList();