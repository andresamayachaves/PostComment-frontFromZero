import { getAllPostsFromBacked,addNewPostToBacked,
        deletePostinBacked } from "./requests/asyncRequests.js"
import { postI } from "./models/models.js"


console.log("Ts compiled to JS and working properly")

let newPostButton   = document.querySelector("#nPostBtn") as HTMLElement
let optionalInput1  = document.querySelector("#opInput1") as HTMLElement
let optionalInput2  = document.querySelector("#opInput2") as HTMLElement
let submitButton    = document.querySelector("#submit")   as HTMLElement
let cancelSubmitButton = document.querySelector("#cancel")as HTMLElement

let deleteButtons:{[id:number]:HTMLElement} = {}
let editButtons  :{[id:number]:HTMLElement} = {}
let likeButtons  :{[id:number]:HTMLElement} = {}

let allPosts:postI[] = [];

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
  getAllPostsFromBacked().then(response =>{
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
  
  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = "single-post-delete-button"
  deleteButton.id = `delete-${post.id}`
  deleteButton.innerText = 'Delete This Post'
 // deleteButton.addEventListener('click', ()=> handleDelete(div))
  
  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = "single-post-edit-button"
  editButton.id = `edit-${post.id}`
  editButton.innerText = 'Edit'
  //editButton.addEventListener('click', ()=> handleEdit(post))
  
  const likeButton:HTMLButtonElement = document.createElement('button')
  likeButton.className = "single-post-like-button"
  likeButton.id = `like-${post.id}`
  likeButton.innerText = 'Like!'
  //editButton.addEventListener('click', ()=> handleEdit(post))

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'cpanel'           //'single-post-container'
  div.classList.add(`post-${post.id}`)

  div.append("---------------------------------------------------------------",
            h2,contentP, deleteButton, editButton, likeButton)
  postsContainer.append(div)
  
  createHTMLButtons(post)
}

function createHTMLButtons(post:postI){

  let delBut = document.querySelector(`#delete-${post.id}` ) as HTMLElement
  delBut.onclick = function(){
    removePost(post)
  }


}

function removePost(post:postI){
  let individualPost   = document.querySelector(`.post-${post.id}`) as HTMLElement
  individualPost.remove()
  deletePostinBacked()
}

//-------------BIG BUTTONS

newPostButton.onclick = function(){
  optionalInput1.style.visibility     = "visible"
  optionalInput2.style.visibility     = "visible"
  submitButton.style.visibility       = "visible"
  cancelSubmitButton.style.visibility = "visible" 
}

submitButton.onclick = function(){
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
  addNewPostToBacked(newPost)
  createPost(newPost)
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
}


//-------------SINGLE POST BUTTONS

function editPost(post:postI){
  console.log("très bien jusqu'ici")
}

function likePost(post:postI){
  console.log("très bien jusqu'ici")  
}