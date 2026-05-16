/* =========================================
   KRISHIMITRA AI — MONITORING
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const uploadArea = document.getElementById("uploadArea");

  const fileInput = document.getElementById("cropUpload");

  const previewContainer =
    document.getElementById("imagePreview");

  const previewImage =
    document.getElementById("previewImage");

  if (!uploadArea || !fileInput) return;

  /* CLICK UPLOAD */

  uploadArea.addEventListener("click", () => {

    fileInput.click();
  });

  /* IMAGE PREVIEW */

  fileInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

      previewImage.src = e.target.result;

      previewContainer.classList.remove("hidden");
    };

    reader.readAsDataURL(file);
  });
});