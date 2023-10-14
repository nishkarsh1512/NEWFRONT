import axios from "axios"

const URL = "http://103.154.184.52:4000"

const getRmsData = async ({ asset_id }: { asset_id: string }) => {
  if (!!asset_id) {
    const queryParams = new URLSearchParams({
      asset_id,
    })

    try {
      const response = await axios.get(
        `${URL}/api/threshold/rms?${queryParams}`
      )

      return response.data
    } catch (error) {
      console.error({ error })
      return null
    }
  } else return null
}

export { getRmsData }
