import React from "react"
import { withStyles } from "@material-ui/core/styles"

import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import styles from "../../styles/index.module.css"
import windMappings from "../../utils/wind-mapping.js"

const StyledTableRow = withStyles(theme => ({
  root: {
    padding: 0,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const StyledTableBodyCell = withStyles(theme => ({
  root: {
    padding: 0,
  },
}))(TableCell)

const WeatherRow = ({
  timestamp,
  rain,
  icon,
  description,
  temp,
  feelsLike,
  windSpeed,
}) => {
  return (
    <TableRow style={styles.tr}>
      <TableCell style={styles.td}>{`${
        timestamp ? `kl. ${timestamp}` : ""
      }`}</TableCell>
      <TableCell style={styles.td}>
        <img
          width="60"
          height="60"
          alt="icon"
          src={`https://openweathermap.org/img/w/${icon}.png`}
        ></img>
      </TableCell>
      <TableCell style={styles.td}>
        {description.charAt(0).toUpperCase() + description.slice(1)}
      </TableCell>
      <TableCell style={styles.td}>{`${rain ? `${rain} mm` : 0}`}</TableCell>
      <TableCell style={styles.td}>{`${Math.round(temp)}°C`}</TableCell>
      <TableCell style={styles.td}>{`${Math.round(feelsLike)}°C`}</TableCell>
      <TableCell style={styles.td}>
        <>
          <div>{`${Math.round(windSpeed)} m/s`}</div>
          <div>{`${windMappings[Math.round(windSpeed)]}`}</div>
        </>
      </TableCell>
    </TableRow>
  )
}

export default WeatherRow
