import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ShelterCard = ({ nombre, direccion, handleNavigate, urlLink }) => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
        wordBreak: "break-word",
        height: "100%",
        paddingBottom: "5px",
        position: "relative",
      }}
    >
      <CardMedia component="img" alt="refugio" height="150" image={urlLink} />
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
            bottom: "0",
            right: "0",
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
