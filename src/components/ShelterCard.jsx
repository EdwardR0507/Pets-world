import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ShelterCard = ({ nombre, direccion, handleNavigate }) => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
        wordBreak: "break-word",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        alt="mascota perdida"
        height="150"
        image="https://source.unsplash.com/random"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Dirección: {direccion}
        </Typography>
        <Button
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "20px",
          }}
          onClick={handleNavigate}
        >
          Ver más
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShelterCard;
