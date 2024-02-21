
export const storeUser = (data:any) => {
    localStorage.setItem(
        'user', 
        JSON.stringify({
            username: data.user.username,
            email: data.user.email,
            jwt: data.jwt,
        })
    )
}

export const userData = () => {
    const stringfiedUser = localStorage.getItem('user') || ""
    if (stringfiedUser) {
        return JSON.parse(stringfiedUser)
    }
    return false
}