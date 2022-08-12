import {postI, commentI} from "../models/models.js"
export async function addNewPostToBackend(post:postI){
    const response:Response = await fetch('http://localhost:8082/api/post/create/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        return response
}

export async function getAllPostsFromBackend(){
    const response:Response = await fetch('http://localhost:8082/api/post/get/all/posts')
    const posts:postI[] = await response.json()

    return posts
}

export async function editPostInBackend(post:postI){
    const response:Response = await fetch('http://localhost:8082/api/post/edit/post', {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return response
} 

export async function deletePostInBackend(post:postI){
    const response:Response = await fetch('http://localhost:8082/api/post/delete/post', {
        method: 'DELETE',
        headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return response
}



//--- Comments

export async function addNewCommentToBackend(comment:commentI){
    const response:Response = await fetch('http://localhost:8082/api/comment/create/comment',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
return response
}
export async function getAllCommentsFromBackend(){
    const response:Response = await fetch('http://localhost:8082/api/comment/get/all/comments')
    const comments:commentI[] = await response.json()

    return comments
}

export async function editCommentInBackend(comment:commentI){
    const response:Response = await fetch('http://localhost:8082/api/comment/create/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    return response

}

export async function deleteCommentInBackend(comment:commentI){
    const response:Response = await fetch('http://localhost:8082/api/comment/delete/comment', {
        method: 'DELETE',
        headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    return response

}