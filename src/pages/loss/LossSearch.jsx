import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllLosses } from "../../features/loss/lossSlice";
import LossCard from "../../components/LossCard";

const LossSearch = () => {
  const { losses } = useSelector((state) => state.loss);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllLosses());
  }, [dispatch]);

  const filteredLosses = losses.filter((loss) => {
    return loss.nombreMascota.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Pérdidas</Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <FormControl sx={{ width: "20rem" }}>
          <TextField
            label="Ingrese el nombre de la mascota"
            name="nombre"
            value={search}
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/loss/register")}
        >
          Registrar mascota perdida
        </Button>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        padding={{ xs: 2, md: 3, lg: 4 }}
      >
        {filteredLosses.length > 0 ? (
          filteredLosses.map((loss) => (
            <Grid item xs={2} sm={4} md={4} key={loss.id}>
              <LossCard {...loss} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h4"
            align="center"
            sx={{
              margin: "auto",
            }}
          >
            No hay mascotas perdidas con ese nombre
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default LossSearch;
