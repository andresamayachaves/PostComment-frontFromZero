import {postI, commentI} from "../models/models.js"
export async function addNewPostToBacked(post:postI){
    const response:Response = await fetch('http://localhost:8080/api/post/create/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        return response
}

export async function getAllPostsFromBacked(){
    const response:Response = await fetch('http://localhost:8080/api/post/get/all/posts')
    const posts:postI[] = await response.json()

    return posts
}

export async function editPostToBacked(post:postI){
    const response:Response = await fetch('http://localhost:8080/api/post/edit/post', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return response
} 

export async function deletePostToBacked(){
    const response:Response = await fetch('http://localhost:8080/api/post/delete/posts', {
        method: "DELETE"
    })
    return response
}



//--- Comments

export async function addNewCommentToBacked(comment:commentI){
    const response:Response = await fetch('http://localhost:8080/api/comment/create/comment',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
return response
}
export async function getAllCommentsFromBacked(){
    const response:Response = await fetch('http://localhost:8080/api/comment/get/all/comments')
    const comments:commentI[] = await response.json()

    return comments
}

export async function editCommentToBacked(comment:commentI){
    const response:Response = await fetch('http://localhost:8080/api/comment/create/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    return response

}

export async function deleteCommentToBacked(){
    //const response:Response = await fetch('http://localhost:8080/api/comment/delete/comment')
    //const posts:postI[] = await response.json()

}