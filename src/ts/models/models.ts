export interface postI{
    id:number|null,
    title:string,
    content:string,
    numberOfLikes: number,
    comments: commentI[]
   // userLikes: userLikesI[]
}

export interface commentI{
    id:number|null,
    content: string,
    numberOfLikes: number,
    //userLikes: userLikesI[]
}

export interface userLikesI{
    id:number,
    userNmae:string,
    dni:string
}