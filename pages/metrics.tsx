import React, { useState, useEffect, memo } from "react"
import Highcharts, { getJSON } from "highcharts"
import axios from "axios"
import DashboardLayout from "../layout/dashboard"
import { SelectChangeEvent } from "@mui/material/Select"
import useDeviceStore from "../store/device"
import OptionsDrawer from "../components/Core/DrawerButton/OptionsDrawer"
import { Grid } from "@mui/material"
import MetricCard from "./metriccard"
import { Box } from "@mui/material"
import useTimeStore from "../store/time"
import Modal from "@mui/material/Modal"
import LinearProgress from "@mui/material/LinearProgress"
import HealthStatus from "../components/Metrics/HealthStatus/index"
import InstantaneousHealth from "../components/Metrics/InstantaneousHealth"

interface DataItem {
  et: number
  knn: number
  rf: number
  bp: number
  start_time: string
}

interface MyObject {
  [key: string]: number
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const Metrics: React.FC = () => {
  const { selectedDevice } = useDeviceStore()
  const [myObject, setMyObject] = useState<MyObject>({})
  const [latestBp, setLatestBp] = useState<MyObject>({})
  const [latestKnn, setLatestKnn] = useState<MyObject>({})
  const [latestRf, setLatestRf] = useState<MyObject>({})
  const [latestEt, setLatestEt] = useState<MyObject>({})
  const [filt, setFilt] = useState<MyObject>({})
  const [isRealtime, setIsRealtime] = useState<boolean>(true)
  const [opens, setOpens] = React.useState(true)

  const [isLoading, setIsLoading] = useState(false)

  // Initial data array
  const [data, setData] = useState<number[]>([1, 2, 3, 4, 5])
  const [xLabels, setxLabels] = useState<string[]>([" ", " ", " ", " ", " "])

  const yLabels: Record<number, string> = {
    0: "Healthy",
    1: "Looseness",
    2: "Misalignment",
    3: "Anomalous Vibration",
    4: "No RMS Value Found",
    5: "No Data Found",
  }

  const [age, setAge] = React.useState("40")

  const change = (event: SelectChangeEvent) => {
    const temp = event.target.value
    setAge(temp)

    handleChange(temp)
  }

  const handleChange = async (updatedValue: string) => {
    setOpens(true)

    if (updatedValue == "10") {
      if (isRealtime) {
        const article = { title: selectedDevice.asset_id }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http://103.154.184.52:4000/api/threshold/metrics",
            article
          )

          setIsLoading(false)

          const etData: number[] = response.data[0].result.map(
            (item: DataItem) => item.et
          )
          const xLabels: string[] = response.data[0].result.map(
            (item: DataItem) => item.start_time
          )

          setData(etData)
          setxLabels(xLabels)

          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      } else if (!isRealtime) {
        const article = {
          title: selectedDevice?.asset_id,
          startDate: startTime,
          endDate: endTime,
        }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http:localhost:4000/api/threshold/check",
            article
          )

          setIsLoading(false)

          const etData: number[] = response.data.map(
            (item: DataItem) => item.et
          )

          const xLabels: string[] = response.data.map(
            (item: DataItem) => item.start_time
          )

          setxLabels(xLabels)
          setData(etData)
          setFilt(response.data[0])
          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
    } else if (updatedValue == "20") {
      if (isRealtime) {
        const article = { title: selectedDevice.asset_id }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http://103.154.184.52:4000/api/threshold/metrics",
            article
          )

          setIsLoading(false)

          const knnData: number[] = response.data[0].result.map(
            (item: DataItem) => item.knn
          )
          const xLabels: string[] = response.data[0].result.map(
            (item: DataItem) => item.start_time
          )

          setData(knnData)
          setxLabels(xLabels)

          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      } else if (!isRealtime) {
        const article = {
          title: selectedDevice?.asset_id,
          startDate: startTime,
          endDate: endTime,
        }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http://103.154.184.52:4000/api/threshold/check",
            article
          )

          setIsLoading(false)

          const knnData: number[] = response.data.map(
            (item: DataItem) => item.knn
          )

          const xLabels: string[] = response.data.map(
            (item: DataItem) => item.start_time
          )

          setxLabels(xLabels)
          setData(knnData)
          setFilt(response.data[0])
          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
    } else if (updatedValue == "40") {
      if (isRealtime) {
        const article = { title: selectedDevice.asset_id }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http://103.154.184.52:4000/api/threshold/metrics",
            article
          )

          setIsLoading(false)

          const bpData: number[] = response.data[0].result.map(
            (item: DataItem) => item.bp
          )
          const xLabels: string[] = response.data[0].result.map(
            (item: DataItem) => item.start_time
          )
          setData(bpData)
          setxLabels(xLabels)
          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      } else if (!isRealtime) {
        const article = {
          title: selectedDevice?.asset_id,
          startDate: startTime,
          endDate: endTime,
        }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http://103.154.184.52:4000/api/threshold/check",
            article
          )

          setIsLoading(false)

          const bpData: number[] = response.data.map(
            (item: DataItem) => item.bp
          )

          const xLabels: string[] = response.data.map(
            (item: DataItem) => item.start_time
          )

          setxLabels(xLabels)
          setData(bpData)
          setFilt(response.data[0])
          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
    } else if (updatedValue == "30") {
      if (isRealtime) {
        const article = { title: selectedDevice.asset_id }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http://103.154.184.52:4000/api/threshold/metrics",
            article
          )

          setIsLoading(false)

          const rfData: number[] = response.data[0].result.map(
            (item: DataItem) => item.rf
          )
          const xLabels: string[] = response.data[0].result.map(
            (item: DataItem) => item.start_time
          )

          setData(rfData)
          setxLabels(xLabels)

          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      } else if (!isRealtime) {
        const article = {
          title: selectedDevice?.asset_id,
          startDate: startTime,
          endDate: endTime,
        }

        setIsLoading(true)

        try {
          const response = await axios.post(
            "http://103.154.184.52:4000/api/threshold/check",
            article
          )

          setIsLoading(false)

          const rfData: number[] = response.data.map(
            (item: DataItem) => item.rf
          )

          const xLabels: string[] = response.data.map(
            (item: DataItem) => item.start_time
          )

          setxLabels(xLabels)
          setData(rfData)
          setFilt(response.data[0])
          setOpens(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    setOpens(true)
    setIsRealtime(true)
    const article = { title: selectedDevice.asset_id }

    setIsLoading(true)

    try {
      axios
        .post("http://103.154.184.52:4000/api/threshold/metrics", article)
        .then((response) => {
          setIsLoading(false)
          const etData: number[] = response.data[0].result.map(
            (item: DataItem) => item.et
          )
          const xLabels: string[] = response.data[0].result.map(
            (item: DataItem) => item.start_time
          )

          setData(etData)
          setxLabels(xLabels)

          setLatestBp(response.data[0].latestDocumentsBp)
          setLatestEt(response.data[0].latestDocumentsEt)
          setLatestKnn(response.data[0].latestDocumentsKnn)
          setLatestRf(response.data[0].latestDocumentsRf)
          setOpens(false)
        })
    } catch (error) {
      setIsLoading(false)
    }
  }, [])

  const allYLabels = Object.values(yLabels)

  // Highcharts configuration options
  const options: Highcharts.Options = {
    title: {
      text: "",
      align: "left",
      margin: 160,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: xLabels.slice().reverse(), // Set x-axis labels
    },
    yAxis: {
      title: {
        text: "Status",
      },
      categories: allYLabels, // Set y-axis labels
      labels: {
        formatter: function () {
          const value = Number(this.value)
          if (!isNaN(value) && yLabels[value] !== undefined) {
            return yLabels[value]
          }
          return this.value.toString()
        },
      },
    },
    series: [
      {
        name: "Data",
        data: data,
        type: "line",
      },
    ],
  }

  const fetchData = async () => {
    if (isRealtime) {
      const article = { title: selectedDevice.asset_id }

      setIsLoading(true)

      try {
        const response = await axios.post(
          "http://103.154.184.52:4000/api/threshold/metrics",
          article
        )

        setIsLoading(false)
        const etData: number[] = response.data[0].result.map(
          (item: DataItem) => item.et
        )
        const rfData: number[] = response.data[0].result.map(
          (item: DataItem) => item.rf
        )
        const knnData: number[] = response.data[0].result.map(
          (item: DataItem) => item.knn
        )
        const bpData: number[] = response.data[0].result.map(
          (item: DataItem) => item.bp
        )
        const xLabels: string[] = response.data[0].result.map(
          (item: DataItem) => item.start_time
        )
        if (age == " 10") {
          setData(etData)
          setxLabels(xLabels)
        } else if (age == "20") {
          setData(knnData)
          setxLabels(xLabels)
        } else if (age == "30") {
          setData(rfData)
          setxLabels(xLabels)
        } else if (age == "40") {
          setData(bpData)
          setxLabels(xLabels)
        }
        setMyObject(response.data[0].startObject)
        setLatestBp(response.data[0].latestDocumentsBp)
        setLatestEt(response.data[0].latestDocumentsEt)
        setLatestKnn(response.data[0].latestDocumentsKnn)
        setLatestRf(response.data[0].latestDocumentsRf)
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    // Fetch data immediately when the component mounts
    fetchData()

    // Set up an interval to fetch data every 60 seconds
    const intervalId = setInterval(() => {
      // fetchData()
    }, 60000)

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const {
    tw_startTime: startTime,
    tw_endTime: endTime,
    set_tw_StartTime: setStartTime,
    set_tw_EndTime: setEndTime,
  } = useTimeStore()

  const getJsonData = () => {
    const temp = data.map((value, index) => ({
      state: value,
      timestamp: xLabels.length > index ? xLabels[index] : null,
    }))

    return {
      all: [
        ...temp,
        { Health_Status: "0 = Healthy" },
        { Health_Status: "1 = Looseness" },
        { Health_Status: "2 = Misalignment" },
        { Health_Status: "3 = Anomalous Vibration" },
        { Health_Status: "4 = No RMS Values Found" },
        { Health_Status: "5 = No Data Found" },
      ],
      data: [...temp],
    }
  }

  console.log({jsonData: getJsonData()})

  return (
    <DashboardLayout>
      <div className="w-full overflow-y-scroll">
        <div className="py-5">
          <HealthStatus
            age={age}
            change={change}
            endTime={endTime}
            isRealtime={isRealtime}
            options={options}
            selectedDevice={selectedDevice}
            setAge={setAge}
            setData={setData}
            setFilt={setFilt}
            setIsRealtime={setIsRealtime}
            setxLabels={setxLabels}
            startTime={startTime}
            jsonData={getJsonData()}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <br />
          <InstantaneousHealth />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-1 Motor DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d7f45c0-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-1 Motor NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d7f93e0-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-1 Fan DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d7ea981-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d7ea981-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7ea981-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d7ea981-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d7ea981-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d7ea981-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d7ea981-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d7ea981-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d7ea981-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-1 Fan NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d7ea982-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d7ea982-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7ea982-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d7ea982-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d7ea982-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d7ea982-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d7ea982-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d7ea982-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d7ea982-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-2 Motor DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8f7261-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8f7261-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8f7261-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8f7261-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8f7261-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8f7261-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8f7261-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8f7261-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8f7261-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-2 Motor NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d7ea980-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d7ea980-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7ea980-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d7ea980-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d7ea980-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d7ea980-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d7ea980-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d7ea980-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d7ea980-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-2 Fan DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d7f45c2-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-2 Fan NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-3 Motor DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d7f45c1-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8a1b31-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>{" "}
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-3 Motor NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8a6950-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8a6950-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8a6950-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8a6950-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8a6950-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8a6950-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8a6950-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8a6950-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8a6950-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-3 Fan DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8b7ac0-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-3 Fan NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8a4240-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8a4240-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8a4240-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8a4240-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8a4240-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8a4240-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8a4240-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8a4240-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8a4240-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-4 Motor DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8a4241-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8a4241-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8a4241-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8a4241-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8a4241-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8a4241-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8a4241-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8a4241-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8a4241-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-4 Motor NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8a1b30-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-4 Fan DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8a1b33-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-4 Fan NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8a1b32-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-5 Motor DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8f4b50-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-5 Motor NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8fc080-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8fc080-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8fc080-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8fc080-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8fc080-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8fc080-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8fc080-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8fc080-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8fc080-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-5 Fan DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d973a90-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d973a90-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d973a90-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d973a90-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d973a90-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d973a90-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d973a90-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d973a90-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d973a90-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-5 Fan NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8e8800-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8e8800-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8e8800-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8e8800-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8e8800-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8e8800-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8e8800-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8e8800-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8e8800-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-6 Motor DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8fe790-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8fe790-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8fe790-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8fe790-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8fe790-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8fe790-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8fe790-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8fe790-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8fe790-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-6 Motor NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d9083d0-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d9083d0-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d9083d0-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d9083d0-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d9083d0-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d9083d0-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d9083d0-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d9083d0-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d9083d0-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-6 Fan DE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d8fe791-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d8fe791-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d8fe791-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d8fe791-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d8fe791-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d8fe791-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d8fe791-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d8fe791-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d8fe791-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
            <Grid item xs={3}>
              <MetricCard
                title="Exhauster-6 Fan NDE"
                value={1200}
                unit="units"
                color={
                  latestBp["6d9083d1-3039-11ed-81ef-d732cfd46ac3"] === 0
                    ? "#2e8545"
                    : latestBp["6d9083d1-3039-11ed-81ef-d732cfd46ac3"] === 1
                    ? "#ba8950"
                    : latestBp["6d9083d1-3039-11ed-81ef-d732cfd46ac3"] === 2
                    ? "#de381f"
                    : latestBp["6d9083d1-3039-11ed-81ef-d732cfd46ac3"] === 3
                    ? "#b806c4"
                    : latestBp["6d9083d1-3039-11ed-81ef-d732cfd46ac3"] === 4
                    ? "#007BFF"
                    : "#8B8000"
                }
                trend="up"
                et={latestEt["6d9083d1-3039-11ed-81ef-d732cfd46ac3"]}
                knn={latestKnn["6d9083d1-3039-11ed-81ef-d732cfd46ac3"]}
                rf={latestRf["6d9083d1-3039-11ed-81ef-d732cfd46ac3"]}
                best={latestBp["6d9083d1-3039-11ed-81ef-d732cfd46ac3"]}
              />
            </Grid>
          </Grid>
        </div>
      </div>

      <OptionsDrawer
        isRmsDataLoading={isLoading}
        refetchRmsData={() => {
          setIsRealtime(true)

          setTimeout(() => {
            handleChange(age)
          }, 200)
        }}
        setIsRmsDataRefreshing={setIsLoading}
      />
    </DashboardLayout>
  )
}

export default memo(Metrics)
