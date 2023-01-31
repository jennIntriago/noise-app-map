import { Search } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Charts } from "../components/Charts";
import { NoiseLayout } from "../layout/NoiseLayout";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getToken } from "../../helpers/getToken";

export const NoiseLeves = () => {
  const { sensors } = useSelector((state) => state.map);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <NoiseLayout>
      <Typography variant="h4" color={"primary"} sx={{ fontWeight: "bold" }}>
        MONITOREO DE RUIDO AMBIENTAL EN MANTA
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Ruido en Manta
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Grid
          sx={{}}
          container
          direction="row"
          flexWrap="wrap"
          columns={{ sm: 4, lg: 12 }}
          // justifyContent="space-between"
          alignItems="center"
          rowSpacing={2}
          columnSpacing={2}
        >
          <Grid item>
            <TextField
              label="Fecha desde"
              InputLabelProps={{ shrink: true }}
              // value={"2023-01-31T09:48"}
              sx={{ width: "300px" }}
              fullWidth
              // label="Fecha"
              id="datefl"
              // type="datetime"
              type="datetime-local"
              {...register("dateTimeflFrom")}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Fecha hasta"
              InputLabelProps={{ shrink: true }}
              // value={"2023-01-31T09:48"}
              sx={{ width: "300px" }}
              fullWidth
              // label="Fecha"
              id="datefl"
              // type="datetime"
              type="datetime-local"
              // value={"2023-01-3109:45"}
              {...register("dateTimeflTo")}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              select
              label="Sensor"
              defaultValue=""
              sx={{ width: "300px" }}
              {...register("sensorId")}
            >
              {sensors.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ color: "#fff" }} type="submit">
              <Search />
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Charts */}
      <Charts />
    </NoiseLayout>
  );
};
