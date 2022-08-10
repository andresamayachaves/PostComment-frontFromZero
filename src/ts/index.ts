import { getAllPostsFromBacked, addNewPostToBacked, 
    editPostToBacked, deletePostToBacked,
    addNewCommentToBacked,  getAllCommentsFromBacked,
    editCommentToBacked, deleteCommentToBacked
  } from "./requests/asyncRequests.js"
import { commentI, postI } from "./models/models.js"

/* const form: HTMLFormElement|null = 
document.querySelector('.comments-form');
 */


//-------------------------------------------------



const comment1:commentI={
  id: null,
  content: "Comment Content",
  numberOfLikes: 0,
  //userLikes: userLikesI[]
}

const post:postI = {
  id:null,
  title:"this",
  content:"Contt",
  numberOfLikes: 0,
  comments: [comment1]
 // userLikes: userLikesI[]
}


console.debug("Ts created")

getAllPostsFromBacked()
addNewPostToBacked(post) 
editPostToBacked(post)
deletePostToBacked()
addNewCommentToBacked(comment1)  
getAllCommentsFromBacked()
editCommentToBacked(comment1) 
deleteCommentToBacked()
