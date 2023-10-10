import { showNotification } from "@mantine/notifications"
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Tooltip,
} from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import axios from "axios"
import { Dispatch, SetStateAction, memo, useRef } from "react"
import { IDevice } from "../../../types"
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined"
import HighchartsReact, {
  HighchartsReactRefObject,
} from "highcharts-react-official"
import OptionsDrawer from "../../Core/DrawerButton/OptionsDrawer"
import Highcharts from "highcharts"
import ExportMenu from "../../Core/ExportMenu"
import exportToImage from "../../../utility/exportToImage"
import exportToPdf from "../../../utility/exportToPdf"
import exportToXLSX from "../../../utility/exportToXlsx"

interface MyObject {
  [key: string]: number
}

interface DataItem {
  et: number
  knn: number
  rf: number
  bp: number
  start_time: string
}

interface Props {
  startTime: string
  setIsRealtime: Dispatch<SetStateAction<boolean>>
  setAge: Dispatch<SetStateAction<string>>
  selectedDevice: IDevice
  endTime: string
  setxLabels: Dispatch<SetStateAction<string[]>>
  setData: Dispatch<SetStateAction<number[]>>
  setFilt: Dispatch<SetStateAction<MyObject>>
  isRealtime: boolean
  age: string
  jsonData: {
    all: any[]
    data: any[]
  }
  change: (event: SelectChangeEvent) => void
  options: Highcharts.Options
}

const Index = ({
  startTime,
  setAge,
  setIsRealtime,
  selectedDevice,
  endTime,
  setxLabels,
  setData,
  setFilt,
  isRealtime,
  age,
  change,
  options,
  jsonData,
}: Props) => {
  const chartRef = useRef<HighchartsReactRefObject>(null)

  // Get Chart json data
  const getChartJsonData = () => {
    // const data = props.data[0].name.length > 0 ? props.data[0].name[0] : null
    // if (!!data) {
    //   const jsonData = data?.timeup.map((time: string, index: number) => {
    //     const x_rms_acl =
    //       data?.x_rms_acl.length > index ? data?.x_rms_acl[index] : "null"
    //     const y_rms_acl =
    //       data?.y_rms_acl.length > index ? data?.y_rms_acl[index] : "null"
    //     const z_rms_acl =
    //       data?.z_rms_acl.length > index ? data?.z_rms_acl[index] : "null"
    //     const x_rms_vel =
    //       data?.x_rms_vel.length > index ? data?.x_rms_vel[index] : "null"
    //     const y_rms_vel =
    //       data?.y_rms_vel.length > index ? data?.y_rms_vel[index] : "null"
    //     const z_rms_vel =
    //       data?.z_rms_vel.length > index ? data?.z_rms_vel[index] : "null"
    //     return {
    //       x_rms_acl,
    //       y_rms_acl,
    //       z_rms_acl,
    //       x_rms_vel,
    //       y_rms_vel,
    //       z_rms_vel,
    //       timestamp: time,
    //     }
    //   })
    //   return jsonData
    // }
  }

  return (
    <div className="bg-white rounded-lg p-3 pt-0 overflow-hiddenrelative">
      <div className="flex flex-col gap-3 pl-2 pt-4">
        <div className="font-bold text-lg">Health State Prediction</div>
        <div className="flex items-center gap-5 z-10">
          <div className="flex items-center gap-2.5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date&Time picker"
                value={startTime}
                inputFormat="DD/MM/YYYY hh:mm A"
                onChange={(value) => {
                  //@ts-ignore
                  if (moment(value?.$d).isBefore(endTime)) {
                    //@ts-ignore
                    setStartTime(moment(value?.$d).format())
                    //@ts-ignore
                  } else {
                    showNotification({
                      title: "User notification",
                      message: "Start_ts can't be greater than end_ts !",
                      autoClose: 2500,
                      styles: () => ({
                        root: {
                          width: "300px",
                          padding: "12.5px 5px 20px 22px",
                          "&::before": {
                            backgroundColor: "rgb(255, 193, 7)",
                          },
                        },
                      }),
                    })
                  }
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    className="shadow py-3 px-4 border rounded"
                  >
                    <input
                      ref={inputRef}
                      {...inputProps}
                      style={{
                        border: "none",
                        outline: "none",
                        width: "155px",
                      }}
                    />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="flex items-center gap-2.5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date&Time picker"
                value={endTime}
                inputFormat="DD/MM/YYYY hh:mm A"
                onChange={(value) => {
                  //@ts-ignore
                  if (moment(value?.$d).isAfter(startTime)) {
                    //@ts-ignore
                    setEndTime(moment(value?.$d).format())
                    //@ts-ignore
                  } else {
                    showNotification({
                      title: "User notification",
                      message: "End_ts can't be lesss than start_ts !",
                      autoClose: 2500,
                      styles: () => ({
                        root: {
                          width: "300px",
                          padding: "12.5px 5px 20px 22px",
                          "&::before": {
                            backgroundColor: "rgb(255, 193, 7)",
                          },
                        },
                      }),
                    })
                  }
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    className="shadow py-3 px-4 border rounded"
                  >
                    <input
                      ref={inputRef}
                      {...inputProps}
                      style={{
                        border: "none",
                        outline: "none",
                        width: "155px",
                      }}
                    />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
          <Tooltip
            title="Refetch"
            arrow
            classes={{
              tooltip: "bg-gray-200 text-black",
              arrow: "text-gray-200",
            }}
          >
            <Button
              onClick={() => {
                console.log("clicked button")
                setIsRealtime(false)
                setAge("10")
                const article = {
                  title: selectedDevice?.asset_id,
                  startDate: startTime,
                  endDate: endTime,
                }
                axios
                  .post(
                    "http://103.154.184.52:4000/api/threshold/check",
                    article
                  )
                  .then((response) => {
                    console.log("point of attraction")
                    console.log("point of attraction")

                    console.log(response.data)
                    const etData: number[] = response.data.map(
                      (item: DataItem) => item.et
                    )

                    const xLabels: string[] = response.data.map(
                      (item: DataItem) => item.start_time
                    )

                    setxLabels(xLabels)
                    setData(etData)
                    console.log(etData)
                    setFilt(response.data[0])
                    console.log("point of attraction")

                    console.log("point of attraction")
                  })
              }}
            >
              <RefreshOutlinedIcon />
            </Button>
          </Tooltip>
          <FormControlLabel
            className="relative right-1"
            classes={{
              label: `font-semibold ${
                isRealtime ? "text-gray-500" : "text-gray-400 transition-all"
              }`,
            }}
            control={
              <Switch
                checked={isRealtime}
                onChange={(e) => setIsRealtime(e.target.checked)}
                classes={{ track: "bg-infoCardDarkGreen" }}
                size="medium"
              />
            }
            label="Realtime"
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Model</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Model"
              onChange={change}
            >
              <MenuItem value={"10"}>
                <em>ET</em>
              </MenuItem>
              <MenuItem value={"20"}>KNN</MenuItem>
              <MenuItem value={"40"}>BEST PREDICTION</MenuItem>
              <MenuItem value={"30"}>RF</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="relative">
        <ExportMenu
          menuItems={[
            {
              label: "Download PNG",
              onClick: () =>
                exportToImage({
                  chartRef,
                  fileName: "health_state.png",
                }),
              image: "",
            },
            {
              label: "Download PDF",
              onClick: () =>
                exportToPdf({
                  jsonData: [...jsonData.data],
                  fileName: "health_state.pdf",
                  headers: [...Object.keys(jsonData.data[0])],
                }),
              image: "",
            },
            {
              label: "Download XLSX",
              onClick: () =>
                exportToXLSX({
                  jsonData: [...jsonData.all],
                  fileName: "health_state.xlsx",
                  headers: [...Object.keys(jsonData.all[0]), "Health_Status"],
                }),
              image: "",
            },
          ]}
          position="right-[-9px] top-[-105px]"
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
        />
      </div>
    </div>
  )
}

export default memo(Index)
