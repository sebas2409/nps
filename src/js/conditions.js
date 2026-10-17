import "../css/style.css"; // Vite lets us import CSS from JS and bundles it per page
import "../css/conditions.css";
import {
  getParkData,
  getParkAlerts,
  getVisitorCenterData
} from "./parkService.mjs";
import {
  alertTemplate,
  visitorCenterTemplate,
  activityTemplate
} from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function renderList(selector, items, template) {
  const listEl = document.querySelector(selector);
  listEl.innerHTML = "";
  listEl.insertAdjacentHTML("beforeend", items.map(template).join(""));
}

function setAlerts(alerts) {
  renderList(".alerts > ul", alerts, alertTemplate);
}

function setVisitorCenters(centers) {
  renderList(".visitor details > ul", centers, visitorCenterTemplate);
}

function setActivities(activities) {
  renderList(".activities details > ul", activities, activityTemplate);
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);
  setActivities(parkData.activities);

  const [alerts, visitorCenters] = await Promise.all([
    getParkAlerts(parkData.parkCode),
    getVisitorCenterData(parkData.parkCode)
  ]);
  setAlerts(alerts);
  setVisitorCenters(visitorCenters);
}

init();
