import { AddLocationAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLocation,
  startNewNote,
  updateSensorForm,
} from "../../store/map/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const Modals = ({ open, setOpen, sensor }) => {
  const { userLocation, messageDelete, messageSaved } = useSelector(
    (state) => state.map
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getUserLocation());
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // setear valores
  if (!!sensor) {
    setValue("sensor", sensor.sensor ? sensor.sensor : "");
    setValue("nombre", sensor.nombre ? sensor.nombre : "");
    setValue("description", sensor.description ? sensor.description : "");
    setValue("unit", sensor.unit ? sensor.unit : "");
    setValue("longitude", sensor.longitude ? sensor.longitude : "");
    setValue("latitude", sensor.latitude ? sensor.latitude : "");
  }

  const handleUserLocationInForm = () => {
    setValue("longitude", userLocation[0]);
    setValue("latitude", userLocation[1]);
  };

  // useEffect(() => {
  //   if (messageDelete.length > 0) {
  //     Swal.fire("Sensor Borrado", messageDelete, "success");
  //   }
  // }, [messageDelete]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            border: "1px solid ##dfe6e9",
            borderRadius: "7px",
            boxShadow: 24,
            p: 4,
            width: { xs: "350px", md: "700px" },
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="primary"
          >
            Actualizar Sensor
          </Typography>
          <form
            onSubmit={handleSubmit((data) => {
              // dispatch(startNewNote(data));
              const { id } = sensor;
              const newSensor = { id, ...data };

              dispatch(updateSensorForm(newSensor));
              // mostrar alerta
              reset();
              setOpen(false);
              // setOpenAlert(true);
            })}
          >
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Sensor"
                  type="text"
                  placeholder="AWE34TC"
                  fullWidth
                  {...register("sensor", { required: "Campo requerido" })}
                  error={!!errors.sensor}
                  helperText={errors.sensor ? "Campo requerido" : ""}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Nombre"
                  type="text"
                  placeholder="Arduino Nano"
                  fullWidth
                  {...register("nombre", { required: "Campo requerido" })}
                  error={!!errors.nombre}
                  helperText={errors.nombre ? "Campo requerido" : ""}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Descripción"
                  type="text"
                  placeholder="Mide el ruido ambiental"
                  fullWidth
                  {...register("description", {
                    required: "Campo requerido",
                  })}
                  error={!!errors.description}
                  helperText={errors.description ? "Campo requerido" : ""}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Unidad de Medida"
                  type="text"
                  placeholder="dB(A)"
                  fullWidth
                  {...register("unit", { required: "Campo requerido" })}
                  error={!!errors.unit}
                  helperText={errors.unit ? "Campo requerido" : ""}
                />
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item xs={5} sx={{ mt: 2 }}>
                  <TextField
                    label="Longitud"
                    type="text"
                    placeholder="0987890"
                    fullWidth
                    {...register("longitude", {
                      required: "Campo requerido",
                    })}
                    error={!!errors.longitude}
                    helperText={errors.longitude ? "Campo requerido" : ""}
                  />
                </Grid>

                <Grid item xs={5} sx={{ mt: 2 }}>
                  <TextField
                    label="Latitud"
                    type="text"
                    placeholder="0987890"
                    fullWidth
                    {...register("latitude", {
                      required: "Campo requerido",
                    })}
                    error={!!errors.latitude}
                    helperText={errors.latitude ? "Campo requerido" : ""}
                  />
                </Grid>
                <Grid item xs={1} sx={{ mt: 2.4, mr: 2 }}>
                  <Tooltip title="Fija ubicación actual">
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={handleUserLocationInForm}
                    >
                      <AddLocationAlt sx={{ fontSize: 35 }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              {/*  */}

              {/*  */}
              <Grid container sx={{ mb: 2, mt: 1, justifyContent: "center" }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ color: "#fff" }}
                  >
                    <Typography>Guardar</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};