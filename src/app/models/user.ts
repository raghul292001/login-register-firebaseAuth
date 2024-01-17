export interface Register {
    displayName:string,
    email:string,
    password:string
}
export interface RegisterResponseModel {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
  }
export interface Login {
    email: string
    password: string
}
export interface LoginResponseModel {
    kind: string
    localId: string
    email: string
    displayName: string
    idToken: string
    registered: boolean
    profilePicture: string
  }
  export interface IToken {
    idToken:string
  }
  export interface UserResponseModel {
    kind: string
    users: User[]
  }
  
  export interface User {
    localId: string
    email: string
    displayName: string
    passwordHash: string
    emailVerified: boolean
    passwordUpdatedAt: number
    providerUserInfo: ProviderUserInfo[]
    validSince: string
    lastLoginAt: string
    createdAt: string
    lastRefreshAt: string
  }
  
  export interface ProviderUserInfo {
    providerId: string
    displayName: string
    federatedId: string
    email: string
    rawId: string
  }