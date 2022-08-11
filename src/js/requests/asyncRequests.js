var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function addNewPostToBackend(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8082/api/post/create/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        return response;
    });
}
export function getAllPostsFromBackend() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8082/api/post/get/all/posts');
        const posts = yield response.json();
        return posts;
    });
}
export function editPostInBackend(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8082/api/post/edit/post', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        return response;
    });
}
export function deletePostInBackend(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8082/api/post/delete/post', {
            method: 'DELETE',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        return response;
    });
}
//--- Comments
export function addNewCommentToBackend(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8082/api/comment/create/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        return response;
    });
}
export function getAllCommentsFromBackend() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8082/api/comment/get/all/comments');
        const comments = yield response.json();
        return comments;
    });
}
export function editCommentInBackend(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8082/api/comment/create/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        return response;
    });
}
export function deleteCommentInBackend() {
    return __awaiter(this, void 0, void 0, function* () {
        //const response:Response = await fetch('http://localhost:8082/api/comment/delete/comment')
        //const posts:postI[] = await response.json()
    });
}
