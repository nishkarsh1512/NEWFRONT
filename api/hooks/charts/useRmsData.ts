import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ResponseError } from "../../client"
import useDeviceStore from "../../../store/device"
import useUserStore from "../../../store/user"
import { getRmsData } from "../../charts"

const useRmsData = (): UseQueryResult<any, ResponseError> => {
  const { selectedDevice } = useDeviceStore()
  const { selectedUser } = useUserStore()

  const asset_id = selectedDevice?.asset_id

  const params = {
    asset_id,
  }

  const rmsDataResult = useQuery<any, ResponseError>(
    ["rmsData", asset_id, selectedUser],
    () =>
      getRmsData({
        ...params,
      }),
    {
      enabled: !!selectedUser && !!asset_id,
      refetchInterval: 30000,
      staleTime: 300000,
    }
  )

  return rmsDataResult
}

export default useRmsData
