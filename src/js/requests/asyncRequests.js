var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function addNewPostToBacked(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/post/create/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        return response;
    });
}
export function getAllPostsFromBacked() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/post/get/all/posts');
        const posts = yield response.json();
        return posts;
    });
}
export function editPostToBacked(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/post/edit/post', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        return response;
    });
}
export function deletePostToBacked() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/post/delete/posts', {
            method: "DELETE"
        });
        return response;
    });
}
//--- Comments
export function addNewCommentToBacked(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/comment/create/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        return response;
    });
}
export function getAllCommentsFromBacked() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/comment/get/all/comments');
        const comments = yield response.json();
        return comments;
    });
}
export function editCommentToBacked(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/api/comment/create/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        return response;
    });
}
export function deleteCommentToBacked() {
    return __awaiter(this, void 0, void 0, function* () {
        //const response:Response = await fetch('http://localhost:8080/api/comment/delete/comment')
        //const posts:postI[] = await response.json()
    });
}