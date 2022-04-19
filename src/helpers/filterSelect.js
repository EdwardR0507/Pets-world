const razasPorEspecie = [
  {
    especie: "PERRO",
    razas: ["SAN BERNARDO", "BEAGLE", "LABRADOR", "OTRA"],
  },
  {
    especie: "GATO",
    razas: ["PERSA", "SIAMES", "OTRA"],
  },
  {
    especie: "HAMSTERS",
    razas: ["BLANCO", "OREJAS", "SIBERIANO", "OTRA"],
  },
];

const filtrarRazas = (especie) => {
  return razasPorEspecie.find((el) => el.especie === especie).razas;
};

export default filtrarRazas;
