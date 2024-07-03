const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");
const form = document.getElementById("paymentForm");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach((content) => content.classList.remove("active"));
    document
      .getElementById(tab.getAttribute("data-target"))
      .classList.add("active");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData();

  const activeContent = document.querySelector(".content.active");
  const mode = activeContent.getAttribute("id");
  formData.append("mode", mode);

  console.log("mode: ",mode);

  activeContent.querySelectorAll("input, select").forEach((input) => {
    formData.append("data", input.value);
    console.log("data:", input.value);
  });

  const hiddenInputs = form.querySelectorAll(".hiddenData");
  hiddenInputs.forEach((input) => {
    formData.append(input.name, input.value);
  });

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.redirected) {
        parent.window.location.href = response.url;
      } else {
        alert(response.statusText);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
