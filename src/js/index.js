import { getAllPostsFromBacked, addNewPostToBacked, deletePostinBacked, editPostInBacked, getAllCommentsFromBacked, } from "./requests/asyncRequests.js";
console.log("Ts compiled to JS and working properly");
let newPostButton = document.querySelector("#nPostBtn");
let optionalInput1 = document.querySelector("#opInput1");
let optionalInput2 = document.querySelector("#opInput2");
let submitButton = document.querySelector("#submit");
let cancelSubmitButton = document.querySelector("#cancel");
let flowState = 0; //FlowState=0, initialState //FlowState=1, creating post //FlowState=2,  editing
let postToEdit;
let allPosts = [];
let allComments = [];
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
    const viewCommentsButton = document.createElement('button');
    viewCommentsButton.className = "single-view-comments-button";
    viewCommentsButton.id = `comments-${post.id}`;
    viewCommentsButton.innerText = 'View Comments';
    const deleteButton = document.createElement('button');
    deleteButton.className = "single-post-delete-button";
    deleteButton.id = `delete-${post.id}`;
    deleteButton.innerText = 'Delete This Post';
    const editButton = document.createElement('button');
    editButton.className = "single-post-edit-button";
    editButton.id = `edit-${post.id}`;
    editButton.innerText = 'Edit';
    const likeButton = document.createElement('button');
    likeButton.className = "single-post-like-button";
    likeButton.id = `like-${post.id}`;
    likeButton.innerText = 'Like!';
    const div = document.createElement('div');
    div.className = 'cpanel';
    div.classList.add(`post-${post.id}`);
    div.append("---------------------------------------------------------------", viewCommentsButton, h2, contentP, deleteButton, editButton, likeButton);
    postsContainer.append(div);
    createHTMLButtons(post);
}
function createHTMLButtons(post) {
    let vComentsBut = document.querySelector(`#edit-${post.id}`);
    vComentsBut.onclick = function () {
        flowState = 3;
        clearBoard(true);
        setAllVisible();
    };
    let delBut = document.querySelector(`#delete-${post.id}`);
    delBut.onclick = function () {
        removePostInHTML(post);
        deletePostinBacked();
    };
    let editBut = document.querySelector(`#edit-${post.id}`);
    editBut.onclick = function () {
        flowState = 2;
        postToEdit = post;
        setAllVisible();
    };
}
function removePostInHTML(post) {
    let individualPost = document.querySelector(`.post-${post.id}`);
    individualPost.remove();
}
function setAllVisible() {
    optionalInput1.style.visibility = "visible";
    optionalInput2.style.visibility = "visible";
    submitButton.style.visibility = "visible";
    cancelSubmitButton.style.visibility = "visible";
}
//-------------BIG BUTTONS
newPostButton.onclick = function () {
    flowState = 1;
    setAllVisible();
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
    clearBoard(true);
    if (flowState == 1) {
        addNewPostToBacked(newPost);
    }
    if (flowState == 2) {
        postToEdit.title = newPostTitle;
        postToEdit.content = newPostContent;
        editPostInBacked(postToEdit);
    }
    renderPosts();
    setInitialVisibility();
    flowState = 0;
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
    flowState = 0;
};
//-------------SINGLE POST BUTTONS
function likePost(post) {
    console.log("très bien jusqu'ici");
}
function clearBoard(posts) {
    allPosts = [];
    if (posts) {
        getAllPostsFromBacked().then(response => {
            allPosts = response;
            console.log(allPosts);
            allPosts.forEach(post => removePostInHTML(post));
        });
    }
    else {
        getAllCommentsFromBacked().then(response => {
            allComments = response;
            console.log(allComments);
            allPosts.forEach(post => removeCommentInHTML(post));
        });
    }
}
function removeCommentInHTML(comment) {
    let individualComment = document.querySelector(`.comment-${comment.id}`);
    individualComment.remove();
}
