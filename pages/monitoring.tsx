import { NoSsr } from "@mui/material"
import Head from "next/head"
import OptionsDrawer from "../components/Core/DrawerButton/OptionsDrawer"
import DevicePanel from "../components/Monitoring/DevicePanel"
import FftChart from "../components/Monitoring/FftChart"
import InstantaneousParameters from "../components/Monitoring/InstantaneousParameters"
import MaintenanceIndex from "../components/Monitoring/MaintenanceIndex"
import DashboardLayout from "../layout/dashboard"
import { useEffect, useState } from "react"
import { AppProvider } from "../components/Monitoring/AppContext"
import useRmsData from "../api/hooks/charts/useRmsData"
import TimeWaveformChart from "../components/Monitoring/TimeWaveformChart"

const Monitoring = () => {
  const {
    data: rmsData,
    isLoading: isRmsDataLoading,
    isFetching: isRmsDataFetching,
    refetch: refetchRmsData,
  } = useRmsData()

  console.log({ rmsData, isRmsDataFetching, isRmsDataLoading })

  const [isRmsDataRefreshing, setIsRmsDataRefreshing] = useState(false)

  useEffect(() => {
    if (!isRmsDataFetching) {
      setIsRmsDataRefreshing(false)
    }
  }, [isRmsDataFetching])

  const [myBoolean, setMyBoolean] = useState(false)

  return (
    <DashboardLayout>
      <AppProvider value={{ myBoolean, setMyBoolean }}>
        <Head>
          <title>EyeVib</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div className="grid grid-cols-4 gap-4 py-5">
          <div className="flex-col flex col-span-3 gap-4 ">
            <TimeWaveformChart
              data={!!rmsData ? [{ name: rmsData }] : [{ name: [] }]}
              isRmsDataLoading={
                (isRmsDataLoading && isRmsDataFetching) || isRmsDataRefreshing
              }
            />
            <FftChart
              data={!!rmsData ? [{ name: rmsData }] : [{ name: [] }]}
              isRmsDataLoading={
                (isRmsDataLoading && isRmsDataFetching) || isRmsDataRefreshing
              }
            />
          </div>
          <div className="flex flex-col gap-4 justify-between max-h-[1230px]">
            <MaintenanceIndex
              data={!!rmsData ? [{ name: rmsData }] : [{ name: undefined }]}
              isRmsDataLoading={
                (isRmsDataLoading && isRmsDataFetching) || isRmsDataRefreshing
              }
            />
            <NoSsr>
              <DevicePanel />
            </NoSsr>
          </div>
          <div className="col-span-4">
            <InstantaneousParameters
              data={!!rmsData ? [{ name: rmsData }] : [{ name: undefined }]}
              isRmsDataLoading={
                (isRmsDataLoading && isRmsDataFetching) || isRmsDataRefreshing
              }
            />
          </div>
        </div>
        <OptionsDrawer
          refetchRmsData={refetchRmsData}
          setIsRmsDataRefreshing={setIsRmsDataRefreshing}
          isRmsDataLoading={
            (isRmsDataLoading && isRmsDataFetching) || isRmsDataRefreshing
          }
        />
      </AppProvider>
    </DashboardLayout>
  )
}

export default Monitoring
