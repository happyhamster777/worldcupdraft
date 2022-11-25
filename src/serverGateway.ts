import { IUser } from "./global"
import { get, post } from "./global/httpRequestUtils"

/** In development mode (locally) the server is at localhost:5000*/
export const endpoint = 'https://limitless-lowlands-24989.herokuapp.com/'
const baseEndpoint = endpoint

/** This is the path to the nodes microservice */
const servicePath = 'user/'

export const createUser = async (user: IUser): Promise<IUser | string> => {
    try {
    console.log('create user: ', user)
      return await post<IUser>(baseEndpoint + servicePath + 'create', {
        user: user,
      })
    } catch (exception) {
      return "failed"
    }
}

export const fetchUsers = async (): Promise<IUser[] | string> => {
    try {
        return await get<IUser[]>(
          baseEndpoint + servicePath + 'users'
        )
      } catch (exception) {
    return "failed"
    }
}