let globalData = null;

fetch("https://openapi.programming-hero.com/api/course/curriculum")
    .then((res) => res.json())
    .then(data => {
        globalData = data.data;
        loadMilestone(globalData);
    });

function loadMilestone(data) {
    console.log(data);
    const Milestones = document.querySelector(".milestones");
    const milestoneHTML = data.map((item) => {
        return `
        <div onclick="showPannel(this, '${item._id}')" class="milestone border-b">
          <div class="flex">
            <div class="checkbox"><input type="checkbox" /></div>
            <div>
              <p>
                ${item.name}
                <span><i class="fas fa-chevron-down"></i></span>
              </p>
            </div>
          </div>
          <div class="hidden_panel">
            ${item.modules.map(function (module) {
                return `
                <div class="module border-b">
                  <p>${module.name}</p>
                </div>
                `;
            }).join("")}
          </div>
        </div>
        `;
    }).join("");

    Milestones.innerHTML = milestoneHTML;
}

function showPannel(milestoneElement, id) {
    const milestones = milestoneElement.querySelector(".hidden_panel");
    const active = document.querySelector(".active");
    if (active && !milestoneElement.classList.contains("active")) {
        active.classList.remove("active");
    }
    milestoneElement.classList.toggle("active");
    const showMilestone = document.querySelector(".show");
    if (showMilestone && !milestones.classList.contains("show")) {
        showMilestone.classList.remove("show");
    }
    milestones.classList.toggle("show");

    showImage(id);
}

function showImage(id) {
    const myImage = document.querySelector(".milestoneImage");
    const title = document.querySelector(".title");
    const details = document.querySelector(".details");
    const selectedItem = globalData.find(item => item._id === id);
    if (selectedItem) {
        console.log(selectedItem); // Log the selected item to see its structure
        
        // Access properties based on the observed structure
        myImage.src = selectedItem.image || "default_image.png";
        title.innerText = selectedItem.title || "No Title Available";
        details.innerText = selectedItem.details || "No Details Available";
    } else {
        console.error("Item not found for ID:", id);
    }
}
