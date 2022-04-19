import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPetsByOwnerId } from "../../../features/pet/petSlice";

const Pets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pets } = useSelector((state) => state.pet);
  console.log("page pets:", pets);

  useEffect(() => {
    dispatch(getPetsByOwnerId());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <Typography variant="h2"> Mis Mascotas</Typography>
      <TableContainer
        sx={{ maxHeight: "300px", width: "90%" }}
        component={Paper}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Especie</TableCell>
              <TableCell align="center">Raza</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPets.map((pet) => (
              <TableRow
                key={pet.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{pet.nombre}</TableCell>
                <TableCell align="center">{pet.especie}</TableCell>
                <TableCell align="center">{pet.raza}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`${pet.id}`)}
                  >
                    Ver más
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
// Delete this after fixed the issue with register pet
const mockPets = [
  {
    id: 1,
    nombre: "Beret",
    especie: "perro",
    raza: "doberman",
  },
];
export default Pets;
