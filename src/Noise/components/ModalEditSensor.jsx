import { AddLocationAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
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
  startNewSensor,
  updateSensorForm,
} from "../../store/map/thunks";

const protocolo = [
  {
    value: 1,
    label: "MQTT",
  },
  {
    value: 2,
    label: "AMQP",
  },
];

export const ModalEditSensor = ({ open, setOpen, sensor }) => {
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
  useEffect(() => {
    if (!!sensor) {
      setValue("name", sensor.name ? sensor.name : "");
      setValue("description", sensor.description ? sensor.description : "");
      setValue(
        "measurementUnit",
        sensor.measurementUnit ? sensor.measurementUnit : ""
      );
      setValue("longitude", sensor.longitude ? sensor.longitude : "");
      setValue("latitude", sensor.latitude ? sensor.latitude : "");
      setValue("locationName", sensor.locationName ? sensor.locationName : "");

      setValue(
        "connectionUrl",
        sensor.connectionUrl ? sensor.connectionUrl : ""
      );

      setValue(
        "connectionUsername",
        sensor.connectionUsername ? sensor.connectionUsername : ""
      );
      setValue(
        "connectionPassword",
        sensor.connectionPassword ? sensor.connectionPassword : ""
      );
    }
  }, [sensor]);

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
            width: { xs: "350px", md: "700px", lg: "900px" },
            overflowY: "scroll",
            height: "90%",
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
            <Divider
              textAlign="left"
              sx={{
                mt: 1,
                fontWeight: "bold",
                color: "#073940",
              }}
            >
              Información del Sensor
            </Divider>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Sensor"
                  type="text"
                  placeholder="AWE34TC"
                  fullWidth
                  size="small"
                  // id="filled-hidden-label-small"
                  {...register("name", {
                    required: "Campo requerido",
                    minLength: 5,
                  })}
                  error={!!errors.name}
                  helperText={errors.name ? "Campo requerido" : ""}
                />
              </Grid>

              {/* <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Nombre"
                      type="text"
                      placeholder="Arduino Nano"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("nombre", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      error={!!errors.nombre}
                      helperText={errors.nombre ? "Campo requerido" : ""}
                    />
                  </Grid> */}

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Descripción"
                  type="text"
                  placeholder="Mide el ruido ambiental"
                  fullWidth
                  size="small"
                  // id="filled-hidden-label-small"
                  {...register("description", {
                    required: "Campo requerido",
                    minLength: 5,
                  })}
                  helperText={errors.description ? "Campo requerido" : ""}
                  error={!!errors.description}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Unidad de Medida"
                  type="text"
                  placeholder="dB(A)"
                  fullWidth
                  size="small"
                  // id="filled-hidden-label-small"
                  {...register("measurementUnit", {
                    required: "Campo requerido",
                    minLength: 5,
                  })}
                  error={!!errors.measurementUnit}
                  helperText={errors.measurementUnit ? "Campo requerido" : ""}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  // no mayor a 100 caracteres
                  label="Lugar"
                  type="text"
                  placeholder="Ejemplo: Facultad de Ciencias Informáticas"
                  fullWidth
                  size="small"
                  // id="filled-hidden-label-small"
                  {...register("locationName", {
                    required: "Campo requerido",
                    minLength: 5,
                    maxLength: 99,
                  })}
                  error={!!errors.locationName}
                  helperText={errors.locationName ? "Campo requerido" : ""}
                />
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item xs={5} sx={{ mt: 2 }}>
                  <TextField
                    label="Longitud"
                    type="text"
                    placeholder="0987890"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("longitude", {
                      required: "Campo requerido",
                      pattern:
                        /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/,
                    })}
                    error={!!errors.longitude}
                    helperText={errors.longitude ? "Campo inválido" : ""}
                    // value={userLocation[0] ? userLocation[0] : ""}
                  />
                </Grid>

                <Grid item xs={5} sx={{ mt: 2 }}>
                  <TextField
                    label="Latitud"
                    type="text"
                    placeholder="0987890"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("latitude", {
                      required: "Campo requerido",
                      pattern: /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/,
                    })}
                    error={!!errors.latitude}
                    helperText={errors.latitude ? "Campo inválido" : ""}
                    // value={userLocation[1] ? userLocation[1] : ""}
                  />
                </Grid>
                <Grid item xs={1} sx={{ mt: 2, mr: 2 }}>
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

                {/* TODO: NUEVOS CAMPOS */}

                <Divider
                  textAlign="left"
                  sx={{
                    mt: 2,
                    mb: 2,
                    width: "100%",
                    fontWeight: "bold",
                    color: "#073940",
                  }}
                >
                  Configuración del Sensor
                </Divider>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    label="Protocolo de conexión "
                    select
                    defaultValue=""
                    placeholder="Ejemplo: MQTT"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("protocolId", {
                      required: "Campo requerido",
                    })}
                    helperText={errors.protocolId ? "Campo requerido" : ""}
                    error={!!errors.protocolId}
                  >
                    {protocolo.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} sx={{ mt: 2, mr: 1 }}>
                    <TextField
                      label="URL de conexión"
                      type="text"
                      placeholder="Ejemplo: www.algo.com"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("connectionUrl", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      helperText={errors.connectionUrl ? "Campo requerido" : ""}
                      error={!!errors.connectionUrl}
                    />
                  </Grid>
                  {/* <Grid item xs={5.5} sx={{ mt: 2, mr: 1 }}>
                        <TextField
                          label="Puerto"
                          type="number"
                          placeholder="Ejemplo: Port"
                          fullWidth
                          size="small"
                          // id="filled-hidden-label-small"
                          {...register("connPort", {
                            required: "Campo requerido",
                            minLength: 4,
                            maxLength: 4,
                          })}
                          helperText={errors.connPort ? "Campo inválido" : ""}
                          error={!!errors.connPort}
                        />
                      </Grid> */}
                </Grid>

                <Grid container justifyContent="space-between">
                  <Grid item xs={5.5} sx={{ mt: 2, mr: 1 }}>
                    <TextField
                      label="Usuario"
                      type="text"
                      placeholder="Ejemplo: username connection"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("connectionUsername", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      error={!!errors.connectionUsername}
                      helperText={
                        errors.connectionUsername ? "Campo requerido" : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={5.5} sx={{ mt: 2, mr: 1 }}>
                    <TextField
                      label="Contraseña"
                      type="password"
                      placeholder="***********"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("connectionPassword", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      error={!!errors.connectionPassword}
                      helperText={
                        errors.connectionPassword ? "Campo requerido" : ""
                      }
                    />
                  </Grid>
                </Grid>

                {/* TODO: NUEVOS CAMPOS */}
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
