import {postI, commentI} from "../models/models.js"
export async function addNewPostToBacked(post:postI){
    const response:Response = await fetch('http://localhost:8082/api/post/create/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        return response
}

export async function getAllPostsFromBacked(){
    const response:Response = await fetch('http://localhost:8082/api/post/get/all/posts')
    const posts:postI[] = await response.json()

    return posts
}

export async function editPostInBacked(post:postI){
    const response:Response = await fetch('http://localhost:8082/api/post/edit/post', {
        method: 'PUT',
        headers: {
            "Access-Control-Allow-Origin": "http://192.168.1.2:8080",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return response
} 

export async function deletePostinBacked(){
    const response:Response = await fetch('http://localhost:8082/api/post/delete/posts', {
        method: "DELETE",
        headers:{
            "Access-Control-Allow-Origin": "http://192.168.1.2:8080",
        }
    })
    return response
}



//--- Comments

export async function addNewCommentToBacked(comment:commentI){
    const response:Response = await fetch('http://localhost:8082/api/comment/create/comment',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
return response
}
export async function getAllCommentsFromBacked(){
    const response:Response = await fetch('http://localhost:8082/api/comment/get/all/comments')
    const comments:commentI[] = await response.json()

    return comments
}

export async function editCommentInBacked(comment:commentI){
    const response:Response = await fetch('http://localhost:8082/api/comment/create/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    return response

}

export async function deleteCommentInBacked(){
    //const response:Response = await fetch('http://localhost:8082/api/comment/delete/comment')
    //const posts:postI[] = await response.json()

}