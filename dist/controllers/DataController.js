import Papa from 'papaparse';
// Función para parsear el archivo CSV y devolver los datos como una promesa
export const parseCSVFile = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true, // Interpretar la primera fila como encabezados
            skipEmptyLines: true, // Omitir líneas vacías
            complete: (results) => {
                resolve(results.data); // Resolver la promesa con los datos parseados
            },
            error: (error) => {
                reject(error); // Rechazar la promesa en caso de error
            },
        });
    });
};
