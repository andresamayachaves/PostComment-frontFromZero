import { getAllPostsFromBacked } from "./requests/asyncRequests.js"
import { postI } from "./models/models.js"


console.log("Ts compiled to JS and working properly")


let optionalInput1  = document.querySelector("#opInput1") as HTMLElement
let optionalInput2  = document.querySelector("#opInput2") as HTMLElement
let optionalButton1 = document.querySelector("#opBt1")    as HTMLElement
let optionalButton2 = document.querySelector("#opBt2")    as HTMLElement

let allPosts:postI[] = [];

optionalButton1.addEventListener('click', createPostHandler)


setInitialVisibility()

function setInitialVisibility(){
  optionalInput1.style.visibility  = "hidden"
  optionalInput2.style.visibility  = "hidden"
  optionalButton1.style.visibility = "hidden"
  optionalButton2.style.visibility = "hidden"
}

function createPostHandler(){

  optionalInput1.style.visibility  = "visible"
  optionalInput2.style.visibility  = "visible"
  optionalButton1.style.visibility = "visible"
  optionalButton2.style.visibility = "visible"
}

getAllPostsFromBacked().then(response =>{
  allPosts = response;
  console.log(allPosts);
  showAllPosts(response);
})

function showAllPosts(allPosts:postI[]){
  allPosts.forEach(post => createPost(post))
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
  deleteButton.className = 'single-post-delete-button'
  deleteButton.innerText = 'Delete This Post'
 // deleteButton.addEventListener('click', ()=> handleDelete(div))
  
  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'single-post-edit-button'
  editButton.innerText = 'Edit'
  //editButton.addEventListener('click', ()=> handleEdit(post))
  
  const likeButton:HTMLButtonElement = document.createElement('button')
  likeButton.className = 'single-post-like-button'
  likeButton.innerText = 'Like!'
  //editButton.addEventListener('click', ()=> handleEdit(post))

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'cpanel'           //'single-post-container'
  div.classList.add(`post-${post.id}`)

  div.append("---------------------------------------------------------------",
            h2,contentP, deleteButton, editButton, likeButton)
  postsContainer.append(div)

          
}