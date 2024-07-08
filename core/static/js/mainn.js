// const likebutton = document.getElementById('likebutton');
// const likeprint = document.getElementById('likeprint');
// console.log(likebutton)
// likebutton.addEventListener('click', function() {
//     console.log("like clicked");
//     var a = likeprint.textContent;
//     likeprint.textContent = parseInt(a) + 1;
//     likebutton.classList.add('disabled');
// }
// )

// var allButtons = document.querySelectorAll('div[class^=button]');
var y = document.getElementsByClassName('like');
var x = document.getElementsByClassName('likeprint');
var z = document.getElementsByClassName('dislike');
console.log(x);
for (var i=0; i<y.length; i++){
    let likebutton = y[i];
    let likeprint = x[i];
    let dislikebutton = z[i];
    likebutton.addEventListener('click',function(){
        console.log("clicked");
        let a = likeprint.textContent;
        likeprint.textContent = parseInt(a) +1;
        likebutton.classList.add('disabled');
        dislikebutton.classList.remove('disabled')
        
    })
    dislikebutton.addEventListener('click',function(){
        let a = likeprint.textContent;
        likeprint.textContent = parseInt(a) - 1;
        dislikebutton.classList.add('disabled');
        likebutton.classList.remove('disabled');

    })

}
console.log(y);

