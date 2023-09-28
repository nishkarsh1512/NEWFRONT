import { Button, Stack, Tooltip } from "@mui/material"
import axiosConfig from "../config/axiosConfig"
import DashboardLayout from "../layout/dashboard"
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined"
import AddIcon from "@mui/icons-material/Add"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PersonIcon from "@mui/icons-material/Person"
import dynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"
import useUserStore from "../store/user"
import { useEffect, useState } from "react"
import axios from "axios"
import { SelectChangeEvent } from "@mui/material/Select"

import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

import * as React from "react"
import { ChangeEvent } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"

import Avatar from "@mui/material/Avatar"

import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import useAuthStore from "../store/auth"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        EyeVib
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const AdministrationHeader = dynamic(
  () => import("../components/Administration/AdministrationHeader"),
  {
    ssr: false,
  }
)

const columns: GridColDef[] = [
  {
    field: "user",
    headerName: "NAME",

    flex: 1,
    sortable: false,
    align: "left",
    headerAlign: "center",
    renderCell: (cellValues) => {
      return (
        <div className="image flex gap-2 items-center ml-5">
          <img
            src={cellValues.formattedValue?.profileImage}
            className="rounded-full w-[50px] h-[50px] object-cover"
            alt="user profile image"
          />
          <p className="font-semibold text-black">
            {cellValues.formattedValue?.name}
          </p>
        </div>
      )
    },
  },
  {
    field: "email",
    headerName: "EMAIL",

    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => {
      return (
        <a
          className="font-semibold text-lightBlue hover:underline transition-all"
          href={"mailto:" + cellValues.formattedValue}
          target="_blank"
          rel="noreferrer"
        >
          {cellValues.formattedValue}
        </a>
      )
    },
  },
  {
    field: "phone",
    headerName: "PHONE",
    type: "string",

    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => {
      return (
        <p className="font-semibold text-black">{cellValues.formattedValue}</p>
      )
    },
  },
  {
    field: "role",
    headerName: "ROLE",
    type: "string",

    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",

    renderCell: (cellValues) => {
      return (
        <div
          className={`flex items-center gap-1 ${
            cellValues.formattedValue === "Admin"
              ? "text-infoCardDarkGreen"
              : "text-lightBlue"
          }`}
        >
          {cellValues.formattedValue === "Admin" ? (
            <AdminPanelSettingsIcon />
          ) : (
            <PersonIcon />
          )}
          <p className="font-semibold">{cellValues.formattedValue}</p>
        </div>
      )
    },
  },
  {
    field: "id",
    headerName: "ID",
    type: "string",

    flex: 1,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => {
      return (
        <p className="font-semibold text-black">{cellValues.formattedValue}</p>
      )
    },
  },
]

import { AppContextProvider } from "../context/contextProvider"

const Administration = () => {
  const { users, setUsers } = useUserStore()
  const { me } = useAuthStore()

  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  /////////////////////////////////
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  //////////////////////////////
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setOpen1(false)
  }

  // const { data, isLoading, error } = useQuery(
  //   ["users"],
  //   async () => {
  //     return axiosConfig
  //       .get(`http://localhost:4000/api/users/all`)
  //       .then((res) => res.data)
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //     onSuccess: (data) => {
  //       setUsers(data)
  //     },
  //   }
  // )
  useEffect(() => {
    axios.post("http://103.154.184.52:4000/api/threshold/users").then((response) => {
      console.log("users   users")
      console.log(response.data)
      console.log("users   users")
      setUsers(response.data)
    })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
  }

  const [selectedOption, setSelectedOption] = React.useState("User")

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value)
  }

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value)
  }

  const saveNow = () => {
    const article = {
      fullName: firstName + " " + lastName,
      email: email,
      phone: phone,
      pass: pass,
      profilePhoto: "",
      role: selectedOption,
    }
    console.log(article)
    ///////////////////////
    /////////////////////////
    axios
      .post("http://103.154.184.52:4000/api/threshold/register", article)
      .then((response) => {
        console.log(response.data)
        setOpen1(true)

        console.log("refetching users")
        // Chain the second Axios request here
        return axios.post("http://103.154.184.52:4000/api/threshold/users")
      })
      .then((response) => {
        console.log("users users")
        console.log(response.data)
        console.log("users users")
        setUsers(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
        setOpen1(false)
      })
    ///////////////////////////
    //////////////////////////
  }
  return (
    <DashboardLayout>
      <AdministrationHeader />
      <div className="mt-5 px-2 bg-white rounded">
        <div className="flex items-center px-5 py-4 justify-between">
          <div className="flex items-center">
            <h1 className="font-bold leading-10" style={{ fontSize: "27.5px" }}>
              Users
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip
              title="New Register"
              arrow
              placement="top"
              // gutter={50}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                className="normal-case bg-lightBlue hover:bg-lightBlue text-white py-1.5"
              >
                Create New
              </Button>
            </Tooltip>
          </div>
        </div>
        <hr className="mx-5 bg-white" />
        <DataGrid
          classes={{
            root: "mx-5",
            sortIcon: "hidden",
            columnHeaderTitle:
              "text-textGray1 leading-[1.6] tracking-[.9px] font-extrabold text-[10px]",
            cellContent:
              "h-[100px] min-h-[100px] max-h-[100px] text-white leading-[1.3] tracking-[.9px] font-semibold text-[12px",
            iconSeparator: "stroke-gray-300 w-[20px]",
            row: "flex items-center",
            menuIconButton: "visible ml-[-6px] w-fit",
          }}
          style={{ height: "calc(100vh - 200px)" }}
          rows={users.map((item, index) => ({
            id: item._id,
            user: {
              name: item.name,
              profileImage: item.profileImage,
            },
            email: item.email,
            phone: item.phone ? item.phone : "null",
            role: item.role,
          }))}
          columns={columns}
          disableSelectionOnClick
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No Users
              </Stack>
            ),
          }}
        />
      </div>
      <React.Fragment>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 700 }}>
            {/* ///////////////////////////////////////////////////checkpoint */}
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="Full Name"
                          autoFocus
                          onChange={handleFirstNameChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          onChange={handleLastNameChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={handleEmailChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="phone"
                          label="Phone Number"
                          name="phone"
                          autoComplete="tel"
                          onChange={handlePhoneChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          fullWidth
                          id="select-option"
                          value={selectedOption}
                          onChange={handleOptionChange}
                        >
                          <MenuItem value="User">User</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          onChange={handlePassChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="allowExtraEmails"
                              color="primary"
                            />
                          }
                          label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                      </Grid>
                    </Grid>
                    {me?.role == "Admin" && (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={saveNow}
                      >
                        Add Now
                      </Button>
                    )}
                    <Grid item xs={12}>
                      {open1 && (
                        <Alert severity="success">New User Added</Alert>
                      )}
                    </Grid>

                    <Grid container justifyContent="flex-center">
                      <Grid item>
                        {/* <Link href="#" variant="body2">
                          Already have an account? Sign in
                        </Link> */}
                        {/* {open1 && (
                          <Alert severity="success">
                            This is a success alert — check it out!
                          </Alert>
                        )} */}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>

            {/* ///////////////////////////////////////////////////////// */}
          </Box>
        </Modal>
      </React.Fragment>
    </DashboardLayout>
  )
}

export default Administration
