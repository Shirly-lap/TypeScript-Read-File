// import Papa from 'papaparse';
import { DataRecord } from './models/model';


let data: DataRecord[] = []; // Array para almacenar los datos del CSV
let filteredData: DataRecord[] = []; // Array para almacenar los datos filtrados
let currentPage = 1; // Página actual de la tabla
const recordsPerPage = 15; // Número de registros por página

// Elementos del DOM
const fileInput = document.getElementById("csvFile") as HTMLInputElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const tableHeaders = document.getElementById('tableHeaders') as HTMLTableRowElement;
const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;
const pagination = document.getElementById('pagination') as HTMLDivElement;

// Evento para manejar la carga del archivo
fileInput.addEventListener("change", async () => {
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileType = file.type;
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        // Validar que el archivo sea CSV
        if ((fileType === "text/csv" || fileType === "application/vnd.ms-excel") && fileExtension === "csv") {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (result) {
                    data = result.data as DataRecord[];
                    filteredData = data;
                    currentPage = 1;
                    renderTable(); // Renderizar la tabla con los datos
                    renderPagination(); // Renderizar la paginación
                }
            });
        } else {
            alert("Por favor, suba un archivo CSV válido.");
            fileInput.value = ''; // Limpiar el input
        }
    }
});

// Evento para manejar la búsqueda en la tabla
searchInput.addEventListener('input', (event) => {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    filteredData = data.filter((record) =>
        Object.values(record).some((value) => value.toLowerCase().includes(searchTerm))
    );
    currentPage = 1;
    renderTable(); // Renderizar la tabla con los datos filtrados
    renderPagination(); // Renderizar la paginación con los datos filtrados
});

// Función para renderizar la tabla
function renderTable() {
    tableHeaders.innerHTML = ''; // Limpiar encabezados
    tableBody.innerHTML = ''; // Limpiar cuerpo

    if (filteredData.length === 0) return;

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