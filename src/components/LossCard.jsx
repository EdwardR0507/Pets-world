import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const LossCard = ({
  nombreMascota,
  razaMascota,
  direccion,
  distrito,
  telefonoA,
  telefonoB,
  mensaje,
  fechaPerdida,
  urlLink,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
        wordBreak: "break-word",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        alt="mascota perdida"
        height="150"
        image={urlLink}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombreMascota} - {razaMascota}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          {mensaje}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Fecha de Pérdida: {fechaPerdida}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Dirección: {direccion}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Distrito: {distrito}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Teléfono 1: {telefonoA}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Teléfono 2: {telefonoB}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LossCard;
