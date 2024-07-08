
var charlimit = document.getElementById('characterlimit');
var confession = document.getElementById('confession');
var postconfess = document.getElementById('postconfess');

function updatecharcount(){
    var a = confession.value;
    //console.log(a.length);
    if (a.length>300){
        postconfess.disabled = true;
    }
    else{
        postconfess.disabled = false;
    }
    charlimit.textContent = a.length + "/300";
}
setInterval(updatecharcount, 100);
updatecharcount();