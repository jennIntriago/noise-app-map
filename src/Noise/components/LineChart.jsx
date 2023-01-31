import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const LineChart = ({ chartData, sensor }) => {
  return (
    <>
      <Typography>
        Niveles de ruido obtenidos del sensor: {sensor.name} (ID: {sensor.id})
      </Typography>
      <Line data={chartData} />
    </>
  );
};
