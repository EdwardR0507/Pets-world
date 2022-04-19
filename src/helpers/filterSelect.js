const razasPorEspecie = [
  {
    especie: "perro",
    razas: ["dobberman", "pitbull", "labrador", "bulldog", "otra"],
  },
  {
    especie: "gato",
    razas: ["siames", "otra"],
  },
];

const filtrarRazas = (especie) => {
  return razasPorEspecie.find((el) => el.especie === especie).razas;
};

export default filtrarRazas;
