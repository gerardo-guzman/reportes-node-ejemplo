
const dateFormater = (date = new Date()) => {
    let fecha;
    try {
        fecha = new Date(date);
    } catch (error) {
        fecha = new Date();
    };
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
}

module.exports = dateFormater;
