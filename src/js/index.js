import { getAllPostsFromBacked, addNewPostToBacked, deletePostinBacked } from "./requests/asyncRequests.js";
console.log("Ts compiled to JS and working properly");
let newPostButton = document.querySelector("#nPostBtn");
let optionalInput1 = document.querySelector("#opInput1");
let optionalInput2 = document.querySelector("#opInput2");
let submitButton = document.querySelector("#submit");
let cancelSubmitButton = document.querySelector("#cancel");
let deleteButtons = {};
let editButtons = {};
let likeButtons = {};
let allPosts = [];
setInitialVisibility();
function setInitialVisibility() {
    optionalInput1.style.visibility = "hidden";
    optionalInput2.style.visibility = "hidden";
    submitButton.style.visibility = "hidden";
    cancelSubmitButton.style.visibility = "hidden";
}
console.log("loaded til' here");
renderPosts();
function renderPosts() {
    getAllPostsFromBacked().then(response => {
        allPosts = response;
        console.log(allPosts);
        allPosts.forEach(post => createPost(post));
    });
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
    deleteButton.className = "single-post-delete-button";
    deleteButton.id = `delete-${post.id}`;
    deleteButton.innerText = 'Delete This Post';
    // deleteButton.addEventListener('click', ()=> handleDelete(div))
    const editButton = document.createElement('button');
    editButton.className = "single-post-edit-button";
    editButton.id = `edit-${post.id}`;
    editButton.innerText = 'Edit';
    //editButton.addEventListener('click', ()=> handleEdit(post))
    const likeButton = document.createElement('button');
    likeButton.className = "single-post-like-button";
    likeButton.id = `like-${post.id}`;
    likeButton.innerText = 'Like!';
    //editButton.addEventListener('click', ()=> handleEdit(post))
    const div = document.createElement('div');
    div.className = 'cpanel'; //'single-post-container'
    div.classList.add(`post-${post.id}`);
    div.append("---------------------------------------------------------------", h2, contentP, deleteButton, editButton, likeButton);
    postsContainer.append(div);
    createHTMLButtons(post);
}
function createHTMLButtons(post) {
    let delBut = document.querySelector(`#delete-${post.id}`);
    delBut.onclick = function () {
        removePost(post);
    };
}
function removePost(post) {
    let individualPost = document.querySelector(`.post-${post.id}`);
    individualPost.remove();
    deletePostinBacked();
}
//-------------BIG BUTTONS
newPostButton.onclick = function () {
    optionalInput1.style.visibility = "visible";
    optionalInput2.style.visibility = "visible";
    submitButton.style.visibility = "visible";
    cancelSubmitButton.style.visibility = "visible";
};
submitButton.onclick = function () {
    let newPostTitle = String(readInput1()); //todo solve
    let newPostContent = String(readInput2()); //todo solve
    let defaultComment = {
        id: null,
        content: "",
        numberOfLikes: 0
    };
    let newPost = {
        id: 1,
        title: newPostTitle,
        content: newPostContent,
        numberOfLikes: 0,
        comments: [defaultComment]
    };
    addNewPostToBacked(newPost);
    createPost(newPost);
    setInitialVisibility();
};
function readInput1() {
    let inputLine1 = document.querySelector('#opInput1');
    return inputLine1.value;
}
function readInput2() {
    let inputLine2 = document.querySelector('#opInput2');
    return inputLine2.value;
}
cancelSubmitButton.onclick = function () {
    setInitialVisibility();
};
//-------------SINGLE POST BUTTONS
function editPost(post) {
    console.log("très bien jusqu'ici");
}
function likePost(post) {
    console.log("très bien jusqu'ici");
}
