import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PetsTable from "../../../components/PetsTable";
import { getPetsByOwnerId } from "../../../features/user/userSlice";

const Pets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pets } = useSelector((state) => state.user);

  const handleNavigate = (id) => {
    navigate(`${id}`);
  };

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
      <PetsTable pets={pets} handleNavigate={handleNavigate} />
    </Box>
  );
};

export default Pets;
