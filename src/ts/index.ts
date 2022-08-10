import { getAllPostsFromBacked, addNewPostToBacked, editPostToBacked, deletePostToBacked, addNewCommentToBacked,  getAllCommentsFromBacked, editCommentToBacked, deleteCommentToBacked } from "./requests/asyncRequests.js"
import { commentI, postI } from "./models/models.js"

console.log("Ts compiled to JS and working properly")

const form: HTMLFormElement |null = 
document.querySelector('.comments-form');


let posts:postI[] = [];
//let comments:commentI[] = [];

//form?.addEventListener('submit', (e) => handleSubmit(e))

getAllPostsFromBacked().then(response =>{
    posts = response;
    console.log(posts);
    showAllPosts(response);
})


function showAllPosts(posts:postI[]){
  posts.forEach(post => createPost(post))
}

function createPost(post: postI) {  
  
  const postsContainer = document.querySelector('.posts-container') as HTMLDivElement
  
  const div:HTMLDivElement = document.createElement('div');
  div.className = 'single-post-container'
  div.classList.add(`post-${post.id}`)
  
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
  

  div.append(h2, contentP, deleteButton, editButton)
  postsContainer.append(div)
          
}


/* 
function handleSubmit(e:SubmitEvent){
    e.preventDefault()
    const titleInput = document.querySelector('.title-input') as HTMLInputElement;
    const contentInput = document.querySelector('.content-input') as HTMLInputElement;

    if(titleInput.value&&contentInput.value){
    
      const newPost:postI = {
        id: null,
        title: titleInput.value,
        content: contentInput.value,
        numberOfLikes: 0,
        comments: []
      }
  
      addNewPostToBacked(newPost).then(
        response => {
          if(response.status === 200){
            posts.push(newPost)
  
            createPost(newPost);  
            titleInput.value = '';
            contentInput.value = '';
          }
        }
      )
      
    }
  } */



//function materializePosts(posts: Array<postI>){}