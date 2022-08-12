import { getAllCommentsFromBackend, deleteCommentInBackend, editCommentInBackend, addNewCommentToBackend } from "./requests/asyncRequests.js";
//----------------------------
let newCommentButton = document.querySelector("#nCommentBtn");
let optionalInput1 = document.querySelector("#opInput1");
let editMainButton = document.querySelector("#edit");
let submitButton = document.querySelector("#submit");
let cancelSubmitButton = document.querySelector("#cancel");
let allComments = [];
let commentToEdit;
setInitialVisibility();
function setInitialVisibility() {
    optionalInput1.style.visibility = "hidden";
    editMainButton.style.visibility = "hidden";
    submitButton.style.visibility = "hidden";
    cancelSubmitButton.style.visibility = "hidden";
}
renderComments();
function renderComments() {
    getAllCommentsFromBackend().then(response => {
        allComments = response;
        console.log(allComments);
        allComments.forEach(comment => createComment(comment));
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
    div.className = 'cpanel-comment';
    div.classList.add(`comment-${comment.id}`);
    div.append("---------------------------------------------------------------", contentP, deleteButton, editButton, likeButton);
    commentsContainer.append(div);
    createHTMLButtonsComment(comment);
}
function createHTMLButtonsComment(comment) {
    let delBut = document.querySelector(`#delete-com-${comment.id}`);
    let editBut = document.querySelector(`#edit-com-${comment.id}`);
    delBut.onclick = function () {
        removeCommentInHTML(comment);
        deleteCommentInBackend(comment);
    };
    editBut.onclick = function () {
        //flowState=2
        commentToEdit = comment;
        setAllVisible();
        submitButton.style.visibility = "hidden";
        editMainButton.style.visibility = "visible";
    };
}
function clearBoard() {
    getAllCommentsFromBackend().then(response => {
        allComments = response;
        console.log(allComments);
        allComments.forEach(comment => removeCommentInHTML(comment));
    });
}
function removeCommentInHTML(comment) {
    let individualComment = document.querySelector(`.comment-${comment.id}`);
    individualComment.remove();
}
function setAllVisible() {
    optionalInput1.style.visibility = "visible";
    submitButton.style.visibility = "visible";
    cancelSubmitButton.style.visibility = "visible";
}
newCommentButton.onclick = function () {
    setAllVisible();
    editMainButton.style.visibility = "hidden";
};
editMainButton.onclick = function () {
    let newContent = String(readInput1());
    commentToEdit.content = newContent;
    editCommentInBackend(commentToEdit);
    renderComments();
};
submitButton.onclick = function () {
    clearBoard();
    let newPostContent = String(readInput1()); //todo solve
    let newComment = {
        id: null,
        content: newPostContent,
        numberOfLikes: 0
    };
    addNewCommentToBackend(newComment);
    setInitialVisibility();
    renderComments();
};
function readInput1() {
    let inputLine1 = document.querySelector('#opInput1');
    return inputLine1.value;
}
cancelSubmitButton.onclick = function () {
    setInitialVisibility();
};
