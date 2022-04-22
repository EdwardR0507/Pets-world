import { Button, Typography } from "@mui/material";

const DashboardSection = ({ title, description, handleClick }) => {
  return (
    <section>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "1rem",
          height: "2rem",
          margin: "1rem 0",
          borderRadius: "0.5rem",
          border: "none",
        }}
        onClick={handleClick}
      >
        Ir
      </Button>
    </section>
  );
};

export default DashboardSection;
