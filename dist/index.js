var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let data = []; // Array para almacenar los datos del CSV
let filteredData = []; // Array para almacenar los datos filtrados
let currentPage = 1; // Página actual de la tabla
const recordsPerPage = 15; // Número de registros por página
// Elementos del DOM
const fileInput = document.getElementById("csvFile");
const searchInput = document.getElementById("searchInput");
const tableHeaders = document.getElementById('tableHeaders');
const tableBody = document.getElementById('tableBody');
const pagination = document.getElementById('pagination');
// Evento para manejar la carga del archivo
fileInput.addEventListener("change", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileType = file.type;
        const fileExtension = (_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        // Validar que el archivo sea CSV
        if ((fileType === "text/csv" || fileType === "application/vnd.ms-excel") && fileExtension === "csv") {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (result) {
                    data = result.data;
                    filteredData = data;
                    currentPage = 1;
                    renderTable(); // Renderizar la tabla con los datos
                    renderPagination(); // Renderizar la paginación
                }
            });
        }
        else {
            alert("Por favor, suba un archivo CSV válido.");
            fileInput.value = ''; // Limpiar el input
        }
    }
}));
// Evento para manejar la búsqueda en la tabla
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filteredData = data.filter((record) => Object.values(record).some((value) => value.toLowerCase().includes(searchTerm)));
    currentPage = 1;
    renderTable(); // Renderizar la tabla con los datos filtrados
    renderPagination(); // Renderizar la paginación con los datos filtrados
});
// Función para renderizar la tabla
function renderTable() {
    tableHeaders.innerHTML = ''; // Limpiar encabezados
    tableBody.innerHTML = ''; // Limpiar cuerpo
    if (filteredData.length === 0)
        return;
    const columns = Object.keys(filteredData[0]);
    // Crear los encabezados de la tabla
    columns.forEach((column) => {
        const th = document.createElement('th');
        th.textContent = column;
        tableHeaders.appendChild(th);
    });
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, filteredData.length);
    // Crear las filas de la tabla
    for (let i = startIndex; i < endIndex; i++) {
        const row = filteredData[i];
        const tr = document.createElement('tr');
        columns.forEach((column) => {
            const td = document.createElement('td');
            td.textContent = row[column];
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    }
}
// Función para renderizar la paginación
function renderPagination() {
    pagination.innerHTML = ''; // Limpiar la paginación
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    // Crear botones de paginación
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i.toString();
        button.disabled = i === currentPage;
        button.addEventListener('click', () => {
            currentPage = i;
            renderTable(); // Renderizar la tabla para la página seleccionada
        });
        pagination.appendChild(button);
    }
}
export {};
