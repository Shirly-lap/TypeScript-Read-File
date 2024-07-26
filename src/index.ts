const fileInput = document.getElementById("csvFile") as HTMLInputElement

fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files.length >0) {
        const file = fileInput.files[0]

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function(result) {
                console.log(result);
            }
        });
    }
})