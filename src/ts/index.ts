import { getAllPostsFromBackend, addNewPostToBackend,
        deletePostInBackend, editPostInBackend,
        getAllCommentsFromBackend, } from "./requests/asyncRequests.js"
import { postI, commentI } from "./models/models.js"
import { idText } from "../../node_modules/typescript/lib/typescript.js"


console.log("Ts compiled to JS and working properly")

let newPostButton   = document.querySelector("#nPostBtn") as HTMLElement
let optionalInput1  = document.querySelector("#opInput1") as HTMLElement
let optionalInput2  = document.querySelector("#opInput2") as HTMLElement
let submitButton    = document.querySelector("#submit")   as HTMLElement
let cancelSubmitButton = document.querySelector("#cancel")as HTMLElement

let flowState:number = 0    //FlowState=0, initialState //FlowState=1, creating post //FlowState=2,  editing
let postToEdit:postI
let commentToEdit:commentI

let allPosts:postI[] = [];
let allComments:commentI[] = [];

setInitialVisibility()

function setInitialVisibility(){
  optionalInput1.style.visibility     = "hidden"
  optionalInput2.style.visibility     = "hidden"
  submitButton.style.visibility       = "hidden"
  cancelSubmitButton.style.visibility = "hidden"
}

console.log("loaded til' here")


renderPosts()


function renderPosts(){
  getAllPostsFromBackend().then(response =>{
    allPosts = response
    console.log(allPosts)
    allPosts.forEach(post => createPost(post))
  })
}

function createPost(post: postI) {  
  
  const postsContainer = document.querySelector('.posts-container') as HTMLDivElement
  
  const h2:HTMLHeadElement = document.createElement('h2');
  h2.className = `single-post-title-${post.id}`
  h2.innerText = post.title
  
  const contentP:HTMLParagraphElement = document.createElement('p')
  contentP.className = `single-post-content-${post.id}`
  contentP.innerText = post.content

  const viewCommentsButton:HTMLButtonElement = document.createElement('button')
  viewCommentsButton.className = "single-view-comments-button"
  viewCommentsButton.id = `comments-${post.id}`
  viewCommentsButton.innerText = 'View Comments'  

  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = "single-post-delete-button"
  deleteButton.id = `delete-${post.id}`
  deleteButton.innerText = 'Delete This Post'
  
  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = "single-post-edit-button"
  editButton.id = `edit-${post.id}`
  editButton.innerText = 'Edit'
  
  const likeButton:HTMLButtonElement = document.createElement('button')
  likeButton.className = "single-post-like-button"
  likeButton.id = `like-${post.id}`
  likeButton.innerText = 'Like!'

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'cpanel'
  div.classList.add(`post-${post.id}`)

  div.append("---------------------------------------------------------------",
  viewCommentsButton, h2,contentP, deleteButton, editButton, likeButton)
  postsContainer.append(div)
  
  createHTMLButtons(post)
}

function createHTMLButtons(post:postI){

  let vComentsBut = document.querySelector(`#edit-${post.id}` ) as HTMLElement
  vComentsBut.onclick = function(){
    flowState = 3
    clearBoard(true)
    commentsView(post)
    setAllVisible()    
  }


  let delBut = document.querySelector(`#delete-${post.id}` ) as HTMLElement
  delBut.onclick = function(){
    if(flowState==0){
      removePostInHTML(post)
      deletePostInBackend(post)
    }
  }

  let editBut = document.querySelector(`#edit-${post.id}` ) as HTMLElement
  editBut.onclick = function(){
    flowState=2
    postToEdit = post
    setAllVisible()    
  }


}

function removePostInHTML(post:postI){
  let individualPost   = document.querySelector(`.post-${post.id}`) as HTMLElement
  individualPost.remove()  
}


function setAllVisible() {
  optionalInput1.style.visibility     = "visible"
  optionalInput2.style.visibility     = "visible"
  submitButton.style.visibility       = "visible"
  cancelSubmitButton.style.visibility = "visible" 
}


//-------------BIG BUTTONS

newPostButton.onclick = function(){
  flowState=1
  setAllVisible()
}

submitButton.onclick = function(){
  clearBoard(true)
  let newPostTitle   = String(readInput1())  //todo solve
  let newPostContent = String(readInput2())   //todo solve
  let defaultComment = {
    id: null,
    content: "",
    numberOfLikes: 0
  }
  let newPost = {
    id: 1,
    title: newPostTitle,
    content: newPostContent,
    numberOfLikes: 0,
    comments: [defaultComment]
  }
  if(flowState==1) {
    addNewPostToBackend(newPost)
    renderPosts()
  }

  if(flowState==2) {
    postToEdit.title = newPostTitle
    postToEdit.content = newPostContent
    editPostInBackend(postToEdit)
    renderPosts()
  }
  flowState=0    
  setInitialVisibility()  
}

function readInput1(){
  let inputLine1 = document.querySelector('#opInput1') as HTMLInputElement
  return inputLine1.value
}

function readInput2(){
  let inputLine2 = document.querySelector('#opInput2') as HTMLInputElement
  return inputLine2.value
}

cancelSubmitButton.onclick = function(){
  setInitialVisibility()
  flowState=0
}


//-------------SINGLE POST BUTTONS

function likePost(post:postI){
  console.log("très bien jusqu'ici")  
}

function clearBoard(posts:boolean){  //true: clearAllPosts in HTML //fañse: clearAllComments in HTML

  allPosts = []
  if(posts){
    getAllPostsFromBackend().then(response =>{
      allPosts = response
      console.log(allPosts)
      allPosts.forEach(post => removePostInHTML(post))
    })
  } else{
    getAllCommentsFromBackend().then(response =>{
      allComments = response
      console.log(allComments)
      allPosts.forEach(post => removeCommentInHTML(post))
    })

  }
}

function removeCommentInHTML(comment: commentI){
  let individualComment = document.querySelector(`.comment-${comment.id}`) as HTMLElement
  individualComment.remove()  
}






//----------------------------

function commentsView(post:postI) {
  clearBoard(true)
  renderComments(post)
}


function renderComments(post:postI) {
  getAllCommentsFromBackend().then(response =>{
    allComments = response
    console.log(allPosts)
    allPosts.forEach(post => createComment(post))
  })
}

function createComment(comment:commentI) {  
  
  const commentsContainer = document.querySelector('.comments-container') as HTMLDivElement
  
  const contentP:HTMLParagraphElement = document.createElement('p')
  contentP.className = `single-comment-content-${comment.id}`
  contentP.innerText = comment.content 

  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = "single-comment-delete-button"
  deleteButton.id = `delete-com-${comment.id}`
  deleteButton.innerText = 'Delete This Post'
  
  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = "single-comment-edit-button"
  editButton.id = `edit-com-${comment.id}`
  editButton.innerText = 'Edit'
  
  const likeButton:HTMLButtonElement = document.createElement('button')
  likeButton.className = "single-comment-like-button"
  likeButton.id = `like-com-${comment.id}`
  likeButton.innerText = 'Like!'

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'cpanel'
  div.classList.add(`comment-${comment.id}`)

  div.append("---------------------------------------------------------------",
  contentP, deleteButton, editButton, likeButton)
  commentsContainer.append(div)
  
  createHTMLButtonsComment(comment)
}

function createHTMLButtonsComment(comment:commentI){

  let delBut = document.querySelector(`#delete-${comment.id}` ) as HTMLElement
  delBut.onclick = function(){
    removeCommentInHTML(comment)
    deleteCommentInBackend(comment)
  }

  let editBut = document.querySelector(`#edit-${comment.id}` ) as HTMLElement
  editBut.onclick = function(){
    flowState=2
    commentToEdit = comment
    setAllVisible()    
  }
}

function deleteCommentInBackend(comment:commentI) {
  throw new Error("Function not implemented.")
}

