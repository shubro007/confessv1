var charlimit = document.getElementById('characterlimit');
var comment = document.getElementById('comment');
var postcomment= document.getElementById('postcomment');

function updatecharcount(){
    var a = comment.value;
    //console.log(a.length);
    if (a.length>150){
        postcomment.disabled = true;
    }
    else{
        postcomment.disabled = false;
    }
    charlimit.textContent = a.length + "/150";

}
setInterval(updatecharcount, 100);
updatecharcount();