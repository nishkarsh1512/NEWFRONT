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
import { Dispatch, SetStateAction, memo } from "react"
import { IDevice } from "../../../types"
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined"
import HighchartsReact from "highcharts-react-official"
import OptionsDrawer from "../../Core/DrawerButton/OptionsDrawer"
import Highcharts from "highcharts"

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
  change: (event: SelectChangeEvent) => void
  options: Highcharts.Options
}

const index = ({
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
}: Props) => {
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

      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default memo(index)
