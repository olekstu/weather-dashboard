import React, { useEffect, useState } from "react"
import {
  withStyles,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles"
import { orange, purple, green } from "@material-ui/core/colors"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import WeatherRow from "../components/WeatherRow/index.js"

const StyledTableHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
    padding: 0,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: orange[500],
  },
})

const IndexPage = () => {
  const [weather, setWeather] = useState({
    current: {
      temp: 999,
      feels_like: 999,
      wind_speed: 999,
      wind_deg: 999,
      weather: [
        {
          icon: "",
          description: "",
        },
      ],
      rain: {
        "1h": 999,
      },
    },
    hourly: [],
  })
  const classes = useStyles()

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=59.938553&appid=16da77fab4eae28715c535eefeef44a0&lon=10,770016&units=metric&exclude=minutely&lang=no"
    )
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setWeather(resultData)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead
            style={{
              "background-color": "rgba(8, 33, 175, 1)",
            }}
          >
            <TableRow>
              <StyledTableHeaderCell></StyledTableHeaderCell>
              <StyledTableHeaderCell>Vær</StyledTableHeaderCell>
              <StyledTableHeaderCell>Beskrivelse</StyledTableHeaderCell>
              <StyledTableHeaderCell>Nedbør</StyledTableHeaderCell>
              <StyledTableHeaderCell>Temp</StyledTableHeaderCell>
              <StyledTableHeaderCell>Føles som</StyledTableHeaderCell>
              <StyledTableHeaderCell>Vind</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <WeatherRow
              style={{
                "background-color": "rgba(128, 147, 255, 1)",
              }}
              icon={weather.current.weather[0].icon}
              description={weather.current.weather[0].description}
              rain={
                weather.current.rain ? weather.current.rain["1h"] : undefined
              }
              temp={weather.current.temp}
              feelsLike={weather.current.feels_like}
              windSpeed={weather.current.wind_speed}
            />
            {weather.hourly.map(hourWeather => {
              console.log(hourWeather)
              return (
                <WeatherRow
                  key={hourWeather.dt}
                  timestamp={new Date(hourWeather.dt * 1000).getHours()}
                  icon={hourWeather.weather[0].icon}
                  description={hourWeather.weather[0].description}
                  rain={hourWeather.rain ? hourWeather.rain["1h"] : undefined}
                  temp={hourWeather.temp}
                  feelsLike={hourWeather.feels_like}
                  windSpeed={hourWeather.wind_speed}
                />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  )
}
export default IndexPage
