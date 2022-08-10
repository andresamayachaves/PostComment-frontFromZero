import { getAllPostsFromBacked, addNewPostToBacked } from "./requests/asyncRequests.js";
console.log("Ts compiled to JS and working properly");
const form = document.querySelector('.comments-form');
let posts = [];
//let comments:postI[] = [];
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
getAllPostsFromBacked().then(response => {
    posts = response;
    console.log(posts);
    recreatePosts(response);
});
function recreatePosts(posts) {
    posts.forEach(post => createPost(post));
}
function handleSubmit(e) {
    e.preventDefault();
    const titleInput = document.querySelector('.title-input');
    const contentInput = document.querySelector('.content-input');
    if (titleInput.value && contentInput.value) {
        const newPost = {
            id: null,
            title: titleInput.value,
            content: contentInput.value,
            numberOfLikes: 0,
            comments: []
        };
        addNewPostToBacked(newPost).then(response => {
            if (response.status === 200) {
                posts.push(newPost);
                createComment(newPost);
                titleInput.value = '';
                contentInput.value = '';
            }
        });
    }
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
    deleteButton.innerText = 'X';
    // deleteButton.addEventListener('click', ()=> handleDelete(div))
    const editButton = document.createElement('button');
    editButton.className = 'single-post-edit-button';
    editButton.innerText = 'edit';
    //editButton.addEventListener('click', ()=> handleEdit(post))
    div.append(h2, contentP, deleteButton, editButton);
    postsContainer.append(div);
}
function materializePosts(posts) {
}
