let chartData = [];
const dailyButton = document.getElementById("daily-button");
const weeklyButton = document.getElementById("weekly-button");
const monthlyButton = document.getElementById("monthly-button");
const trackingSection = document.querySelector(".page-layout");

// Fetch the data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    chartData = data;
    render("weekly"); // Default view
  });

function render(timeframe) {
  trackingSection.innerHTML = ""; // Clear previous cards

  chartData.forEach((data) => {
    // Main card container
    const card = document.createElement("div");
    card.classList.add("activity-card");

    // ICON Background Section
    const iconSection = document.createElement("div");
    iconSection.classList.add(
      "icon-postion",
      `${data.title.toLowerCase().replace(/\s+/g, "-")}-image-section`
    );

    const iconImg = document.createElement("img");
    iconImg.classList.add("icon-image");
    iconImg.src = `images/icon-${data.title
      .toLowerCase()
      .replace(/\s+/g, "-")}.svg`;
    iconImg.alt = data.title;

    iconSection.appendChild(iconImg);

    // DETAIL Section
    const detailSection = document.createElement("div");
    detailSection.classList.add("detail-breakdown");

    // Inside DETAIL → activity-info
    const activityInfo = document.createElement("div");
    activityInfo.classList.add("activity-info");

    // Inside activity-info → activity-header
    const activityHeader = document.createElement("div");
    activityHeader.classList.add("activity-header");

    const title = document.createElement("h2");
    title.classList.add("activity-title");
    title.textContent = data.title;

    const ellipsis = document.createElement("img");
    ellipsis.classList.add("ellipsis");
    ellipsis.src = "images/icon-ellipsis.svg";
    ellipsis.alt = "More options";

    activityHeader.appendChild(title);
    activityHeader.appendChild(ellipsis);

    // Inside activity-info → activity-time
    const activityTime = document.createElement("div");
    activityTime.classList.add("activity-time");

    const currentHours = document.createElement("p");
    currentHours.classList.add("current-hours");
    currentHours.textContent = `${data.timeframes[timeframe].current}hrs`;

    const previousHours = document.createElement("p");
    previousHours.classList.add("previous-hours");
    previousHours.textContent = `Last ${capitalize(timeframe)} - ${
      data.timeframes[timeframe].previous
    }hrs`;

    activityTime.appendChild(currentHours);
    activityTime.appendChild(previousHours);

    // Nest correctly
    activityInfo.appendChild(activityHeader);
    activityInfo.appendChild(activityTime);
    detailSection.appendChild(activityInfo);

    // Put together card
    card.appendChild(iconSection);
    card.appendChild(detailSection);

    // Add card to page
    trackingSection.appendChild(card);
  });
}

// Utility function: Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Button Event Listeners
dailyButton.addEventListener("click", () => {
  render("daily");
  setActiveButton(dailyButton);
});

weeklyButton.addEventListener("click", () => {
  render("weekly");
  setActiveButton(weeklyButton);
});

monthlyButton.addEventListener("click", () => {
  render("monthly");
  setActiveButton(monthlyButton);
});

// Set active button style
function setActiveButton(activeButton) {
  [dailyButton, weeklyButton, monthlyButton].forEach((btn) => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
}

// Set initial active button
setActiveButton(weeklyButton);
