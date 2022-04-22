const raceBySpecies = [
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

const filterRaces = (especie) => {
  const races = raceBySpecies.find((el) => el.especie === especie).razas;
  return races.map((race) => {
    return {
      value: race,
      label: race,
    };
  });
};

export default filterRaces;
