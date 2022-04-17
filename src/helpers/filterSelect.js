const razasPorEspecie = [
    {
        especie: "perro",
        razas: ["dobberman", "pitbull", "labrador", "bulldog", "otro"]
    },
    {
        especie: "gato",
        razas: ["siames", "otro"]
    }
]

const filtrarRazas = (especie) => {
    return razasPorEspecie.find(el => el.especie === especie).razas;
};

export default filtrarRazas;