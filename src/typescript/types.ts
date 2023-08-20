export enum resultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type ServerResponse<D = {}> = {
    data: D
    fieldsErrors: []
    messages: []
    resultCode: resultCodeEnum,
}

export type Photos = {
    small: string | null,
    large: string | null
}

export type LoginData = {
    email: string,
    password: string,
    remember: boolean,
    captcha: any
}

export type ContactsData = {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}

export type ProfileData = {
    aboutMe: string | null
    contacts: ContactsData
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    photos: Photos
    userId: number
}

export type UserData = {
    followed: boolean
    id: number
    name: string
    photos: Photos 
    status: string | null
    uniqueUrlName: null
}

export type DialogData = { id: number, name: string }
export type MessageData = { id: number, user: number, text: string, time: string}
export type PostData = { id: number, text: string }
