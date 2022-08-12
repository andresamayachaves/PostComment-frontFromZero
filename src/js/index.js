import { getAllPostsFromBackend, addNewPostToBackend, deletePostInBackend, editPostInBackend, getAllCommentsFromBackend, } from "./requests/asyncRequests.js";
console.log("Ts compiled to JS and working properly");
let newPostButton = document.querySelector("#nPostBtn");
let optionalInput1 = document.querySelector("#opInput1");
let optionalInput2 = document.querySelector("#opInput2");
let editMainButton = document.querySelector("#edit");
let submitButton = document.querySelector("#submit");
let cancelSubmitButton = document.querySelector("#cancel");
let flowState = 0; //FlowState=0, initialState //FlowState=1, creating post //FlowState=2,  editing
let postToEdit;
let commentToEdit;
let allPosts = [];
let allComments = [];
setInitialVisibility();
function setInitialVisibility() {
    optionalInput1.style.visibility = "hidden";
    optionalInput2.style.visibility = "hidden";
    submitButton.style.visibility = "hidden";
    cancelSubmitButton.style.visibility = "hidden";
    editMainButton.style.visibility = "hidden";
}
console.log("loaded til' here");
renderPosts();
function renderPosts() {
    getAllPostsFromBackend().then(response => {
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
    let vComentsBut = document.querySelector(`#comments-${post.id}`);
    let delBut = document.querySelector(`#delete-${post.id}`);
    let editBut = document.querySelector(`#edit-${post.id}`);
    vComentsBut.onclick = function () {
        flowState = 3;
        clearBoard(true);
        commentsView(post);
        setAllVisible();
    };
    delBut.onclick = function () {
        if (flowState == 0) {
            removePostInHTML(post);
            deletePostInBackend(post);
        }
    };
    editBut.onclick = function () {
        flowState = 2;
        editMainButton.style.visibility = "visible";
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
editMainButton.onclick = function () {
    let newTitle = String(readInput1()); //todo solve
    let newContent = String(readInput2());
    if (flowState == 2) {
        postToEdit.title = newTitle;
        postToEdit.content = newContent;
        editPostInBackend(postToEdit);
        renderPosts();
    }
};
//-------------BIG BUTTONS
newPostButton.onclick = function () {
    flowState = 1;
    setAllVisible();
    editMainButton.style.visibility = "hidden";
};
submitButton.onclick = function () {
    clearBoard(true);
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
    if (flowState == 1) {
        addNewPostToBackend(newPost);
        renderPosts();
    }
    flowState = 0;
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
    flowState = 0;
};
//-------------SINGLE POST BUTTONS
function likePost(post) {
    console.log("très bien jusqu'ici");
}
function clearBoard(posts) {
    allPosts = [];
    if (posts) {
        getAllPostsFromBackend().then(response => {
            allPosts = response;
            console.log(allPosts);
            allPosts.forEach(post => removePostInHTML(post));
        });
    }
    else {
        getAllCommentsFromBackend().then(response => {
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
//----------------------------
function commentsView(post) {
    clearBoard(true);
    renderComments(post);
}
function renderComments(post) {
    getAllCommentsFromBackend().then(response => {
        allComments = response;
        console.log(allPosts);
        allPosts.forEach(post => createComment(post));
    });
}
function createComment(comment) {
    const commentsContainer = document.querySelector('.comments-container');
    const contentP = document.createElement('p');
    contentP.className = `single-comment-content-${comment.id}`;
    contentP.innerText = comment.content;
    const deleteButton = document.createElement('button');
    deleteButton.className = "single-comment-delete-button";
    deleteButton.id = `delete-com-${comment.id}`;
    deleteButton.innerText = 'Delete This Post';
    const editButton = document.createElement('button');
    editButton.className = "single-comment-edit-button";
    editButton.id = `edit-com-${comment.id}`;
    editButton.innerText = 'Edit';
    const likeButton = document.createElement('button');
    likeButton.className = "single-comment-like-button";
    likeButton.id = `like-com-${comment.id}`;
    likeButton.innerText = 'Like!';
    const div = document.createElement('div');
    div.className = 'cpanel';
    div.classList.add(`comment-${comment.id}`);
    div.append("---------------------------------------------------------------", contentP, deleteButton, editButton, likeButton);
    commentsContainer.append(div);
    createHTMLButtonsComment(comment);
}
function createHTMLButtonsComment(comment) {
    let delBut = document.querySelector(`#delete-${comment.id}`);
    delBut.onclick = function () {
        removeCommentInHTML(comment);
        deleteCommentInBackend(comment);
    };
    let editBut = document.querySelector(`#edit-${comment.id}`);
    editBut.onclick = function () {
        flowState = 2;
        commentToEdit = comment;
        setAllVisible();
        submitButton.style.visibility = "hidden";
        editMainButton.style.visibility = "visible";
    };
}
function deleteCommentInBackend(comment) {
    throw new Error("Function not implemented.");
}
