import axios from "axios"
import { IUser } from "../types"

const URL = "http://103.154.184.52:4000"

const getUsers = async ({
  setUsers,
}: {
  setUsers: (users: IUser[]) => void
}): Promise<any> => {
  try {
    const response = await axios.post(`${URL}/api/threshold/users`)

    setUsers(response.data)

    return response.data
  } catch (error) {
    console.error({ error })
  }
}

const registerUser = async ({
  user,
}: {
  user: {
    fullName: string
    email: string
    phone: string
    pass: string
    profilePhoto: string
    role: string
  }
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}api/threshold/register`,
      user
    )

    return response.data
  } catch (error) {
    console.error({ error })
  }
}

const deleteUser = async ({ userId }: { userId: string }): Promise<any> => {
  try {
    const response = await axios.delete(
      `${URL}api/users/${userId}`
    )

    console.log({ response })

    return response.data
  } catch (error) {
    console.error({ error })
  }
}

export { getUsers, registerUser, deleteUser }
