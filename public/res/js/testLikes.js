const likeDisplay= document.getElementById("likes");
const dislikeDisplay= document.getElementById("dislikes");
const thumbsUp = document.getElementById("thumbs-up");
const thumbsDown = document.getElementById("thumbs-down");
let likeExecuted=false;
let dislikeExecuted=false;
let numOfLikes= 5;
let numOfDislikes= 5;
likeDisplay.innerHTML=numOfLikes;
dislikeDisplay.innerHTML= numOfDislikes;
//adds 1 each time you click like
let likable=0;
//modulo determines whether its a like or unlike
let likeModulo = 0;
//adds 1 each time you click dislike
let dislikable=0;
//modulo determines whether its a dislike or undislike
let dislikeModulo = 0;

//shows on webpage number of likes
const showLike=()=>{
  likeDisplay.innerHTML=numOfLikes;
}
const blueLike=()=>{
  thumbsUp.style.color="blue";
}
const unBlueLike=()=>{
  thumbsUp.style.color="black";
}

//shows on webpage number of dislikes
const showDislike=()=>{
  dislikeDisplay.innerHTML= numOfDislikes;
}
const redDislike=()=>{
  thumbsDown.style.color="red";
}
const unRedDislike=()=>{
  thumbsDown.style.color="black";
}


/*
like only happens if like.executed= false.
if i like, like.executed= true and i cant like again
then add 1 to likes.

if dislike is true (meaning they had first disliked)
make dislike.executed=false;
and if dislike.executed is true at that point then subtract 1 from dislikes and set it to false
display dislike- basically do nothing
if dislike.executed is not true then that means they havent disliked before 
liking and so i dont have to subtract from the dislike.
*/

const like=()=>{
  //add to like
  if(likeExecuted==false){
    likeExecuted=true;
    numOfLikes++;
    showLike();
    blueLike();
  }

  //remove dislike
  if(dislikeExecuted==true){
    /* dislikeExecuted=false;
    numOfDislikes--;
    showDislike();
    unRedDislike(); */
    unDislike();
  }
}

/**dislike only happens if dislike.executed=false.
 if i dislike, set dislike.executed=true and add 1 to dislike.

 in that instance of disliking, if they had already liked, i.e like.executed= true
 then set like.executed=false and subtract 1 from likes and then display it.
 if like.executed=false then they havent liked it prior and no subtraction is
 necessary from the num of liked
 */
const dislike=()=>{
  //dislike
  if(dislikeExecuted==false){
    dislikeExecuted=true;
    numOfDislikes++;
    showDislike();
    redDislike();
  }

  //remove like
  if(likeExecuted==true){
    /* likeExecuted=false;
    numOfLikes--;
    showLike();
    unBlueLike(); */
    unlike();

  }
}
/*you can only unlike if it has been liked
i.e likeExecuted=true
*/
const unlike=()=>{
  if(likeExecuted==true){
    likeExecuted=false;
    numOfLikes--;
    showLike();
    unBlueLike();
  }

}
/*You can only undislike if you have disliked
*/
const unDislike=()=>{
  if(dislikeExecuted==true){
    dislikeExecuted=false;
    numOfDislikes--;
    showDislike();
    unRedDislike();
  }
}

const likeOrNot=()=>{
  if(likeModulo == 1){
    unlike();
  }
  else if (likeModulo == 0){
    like();
  }
  likable++;
  likeModulo= likable % 2;
}

//increases likable each time it is clicked so we know is it a like or unlike

const dislikeOrNot=()=>{
  if(dislikeModulo == 1){
    unDislike();

  }
  else if (dislikeModulo == 0){
    dislike();

  }
  dislikable++;
  dislikeModulo= dislikable % 2;
}