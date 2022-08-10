import { getAllPostsFromBacked } from "./requests/asyncRequests.js";
console.log("Ts compiled to JS and working properly");
let optionalInput1 = document.querySelector("#opInput1");
let optionalInput2 = document.querySelector("#opInput2");
let optionalButton1 = document.querySelector("#opBt1");
let optionalButton2 = document.querySelector("#opBt2");
let allPosts = [];
optionalButton1.addEventListener('click', createPostHandler);
setInitialVisibility();
function setInitialVisibility() {
    optionalInput1.style.visibility = "hidden";
    optionalInput2.style.visibility = "hidden";
    optionalButton1.style.visibility = "hidden";
    optionalButton2.style.visibility = "hidden";
}
function createPostHandler() {
    optionalInput1.style.visibility = "visible";
    optionalInput2.style.visibility = "visible";
    optionalButton1.style.visibility = "visible";
    optionalButton2.style.visibility = "visible";
}
getAllPostsFromBacked().then(response => {
    allPosts = response;
    console.log(allPosts);
    showAllPosts(response);
});
function showAllPosts(allPosts) {
    allPosts.forEach(post => createPost(post));
}
function createPost(post) {
    const postsContainer = document.querySelector('.posts-container');
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
    const likeButton = document.createElement('button');
    likeButton.className = 'single-post-like-button';
    likeButton.innerText = 'Like!';
    //editButton.addEventListener('click', ()=> handleEdit(post))
    const div = document.createElement('div');
    div.className = 'cpanel'; //'single-post-container'
    div.classList.add(`post-${post.id}`);
    div.append("---------------------------------------------------------------", h2, contentP, deleteButton, editButton, likeButton);
    postsContainer.append(div);
}
