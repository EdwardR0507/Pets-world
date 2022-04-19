import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PetsTable from "../../../components/PetsTable";
import { getPetsByOwnerId } from "../../../features/pet/petSlice";

const Pets = () => {
  const dispatch = useDispatch();

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
      <PetsTable />
    </Box>
  );
};

export default Pets;
