import { getAllCommentsFromBackend, 
    deleteCommentInBackend, editCommentInBackend,
    addNewCommentToBackend} from "./requests/asyncRequests.js"
import { postI, commentI } from "./models/models.js"

//----------------------------

let newCommentButton   = document.querySelector("#nCommentBtn") as HTMLElement
let optionalInput1  = document.querySelector("#opInput1") as HTMLElement
let editMainButton  = document.querySelector("#edit") as HTMLElement
let submitButton    = document.querySelector("#submit")   as HTMLElement
let cancelSubmitButton = document.querySelector("#cancel")as HTMLElement


let allComments:commentI[] = [];
let commentToEdit:commentI

setInitialVisibility()

function setInitialVisibility(){
  optionalInput1.style.visibility     = "hidden"
  editMainButton.style.visibility     = "hidden"
  submitButton.style.visibility       = "hidden"
  cancelSubmitButton.style.visibility = "hidden"
  
}

renderComments()

function renderComments() {
    getAllCommentsFromBackend().then(response =>{
      allComments = response
      console.log(allComments)
      allComments.forEach(comment => createComment(comment))
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
    div.className = 'cpanel-comment'
    div.classList.add(`comment-${comment.id}`)
  
    div.append("---------------------------------------------------------------",
    contentP, deleteButton, editButton, likeButton)
    commentsContainer.append(div)
    
    createHTMLButtonsComment(comment)
  }
  
  function createHTMLButtonsComment(comment:commentI){
  
    let delBut = document.querySelector(`#delete-com-${comment.id}`) as HTMLElement
    let editBut = document.querySelector(`#edit-com-${comment.id}` ) as HTMLElement
  
    delBut.onclick = function(){
      removeCommentInHTML(comment)
      deleteCommentInBackend(comment)
    }
  
    editBut.onclick = function(){
      //flowState=2
      commentToEdit = comment
      setAllVisible() 
      submitButton.style.visibility = "hidden"
      editMainButton.style.visibility = "visible"
    }
  }

function clearBoard(){
    getAllCommentsFromBackend().then(response =>{
        allComments = response
        console.log(allComments)
        allComments.forEach(comment => removeCommentInHTML(comment))
    })
}

function removeCommentInHTML(comment: commentI) {
    let individualComment = document.querySelector(`.comment-${comment.id}`) as HTMLElement
    individualComment.remove() 
}

function setAllVisible() {
    optionalInput1.style.visibility     = "visible"
    submitButton.style.visibility       = "visible"
    cancelSubmitButton.style.visibility = "visible" 
  }

  

  newCommentButton.onclick = function(){
    setAllVisible()
    editMainButton.style.visibility = "hidden";
  }
  
  editMainButton.onclick = function(){
  
    let newContent = String(readInput1())
  
    commentToEdit.content = newContent
    editCommentInBackend(commentToEdit)
    renderComments()
  
  }
  
  submitButton.onclick = function(){
    clearBoard()
    let newPostContent = String(readInput1())   //todo solve
    let newComment = {
      id: null,
      content: newPostContent,
      numberOfLikes: 0
    }
    addNewCommentToBackend(newComment)
     
    setInitialVisibility()  
    renderComments()
  }
  
  function readInput1(){
    let inputLine1 = document.querySelector('#opInput1') as HTMLInputElement
    return inputLine1.value
  }
  
  cancelSubmitButton.onclick = function(){
    setInitialVisibility()
  }
  
  