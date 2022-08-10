import { getAllPostsFromBacked } from "./requests/asyncRequests.js";
console.log("Ts compiled to JS and working properly");
const form = document.querySelector('.comments-form');
let posts = [];
//let comments:commentI[] = [];
//form?.addEventListener('submit', (e) => handleSubmit(e))
getAllPostsFromBacked().then(response => {
    posts = response;
    console.log(posts);
    showPosts(response);
});
function showPosts(posts) {
    posts.forEach(post => createPost(post));
}
function createPost(post) {
    const postsContainer = document.querySelector('.posts-container');
    const div = document.createElement('div');
    div.className = 'single-post-container';
    div.classList.add(`post-${post.id}`);
    const h2 = document.createElement('h2');
    h2.className = `single-post-title-${post.id}`;
    h2.innerText = post.title;
    const contentP = document.createElement('p');
    contentP.className = `single-post-content-${post.id}`;
    contentP.innerText = post.content;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-post-delete-button';
    deleteButton.innerText = 'Delete This Post';
    // deleteButton.addEventListener('click', ()=> handleDelete(div))
    const editButton = document.createElement('button');
    editButton.className = 'single-post-edit-button';
    editButton.innerText = 'Edit';
    //editButton.addEventListener('click', ()=> handleEdit(post))
    div.append(h2, contentP, deleteButton, editButton);
    postsContainer.append(div);
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
