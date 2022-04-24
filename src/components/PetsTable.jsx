import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PetsTable = ({ pets, handleNavigate }) => {
  return (
    <TableContainer sx={{ maxHeight: "300px", width: "90%" }} component={Paper}>
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
          {pets.length > 0 ? (
            pets.map((pet) => (
              <TableRow
                key={pet.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{pet.nombre}</TableCell>
                <TableCell align="center">{pet.especie}</TableCell>
                <TableCell align="center">
                  {pet.raza || pet.razaEspecifica}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleNavigate(pet.id)}
                  >
                    Ver más
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                No hay mascotas registradas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PetsTable;
