export interface LoginSuccessResponse {
    message: string,
    user: UserResponse ,
    token: string

}
export interface LoginFailResponse {
    message: string,
    statusMsg: string
}
export interface UserResponse {
    name: string,
    email: string,
    role: string
}