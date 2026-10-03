/* Seeded from docs/system-requirements.md. Shown even when localStorage is empty. */
var DRONE_BRIEF = {
  id: "drone-response",
  title: "DroneResponse — river rescue and item delivery",
  outline: "Scope is the UC1 and UC2 main use cases from sUAS-UseCases (SPLC-2020). UC1, River and Ice Search and Rescue, is led by the Drone Commander. UC2, Deliver Item to Target Location, is led by the Dispatcher. Compare monolith · orchestration, where only the Airspace Service is an existing system and the drone fleet is in scope, with microservices · choreography, where both the Airspace Service and the Fleet Service are existing systems outside the box."
};

var BRIEFS_KEY = "uml-soa-briefs";

function cloneBrief(brief) {
  return { id: brief.id, title: brief.title, outline: brief.outline };
}

function loadBriefs() {
  try {
    var raw = localStorage.getItem(BRIEFS_KEY);
    if (!raw) return [cloneBrief(DRONE_BRIEF)];
    var data = JSON.parse(raw);
    if (!Array.isArray(data)) return [cloneBrief(DRONE_BRIEF)];
    var briefs = data.filter(function (brief) {
      return brief && typeof brief.id === "string" && brief.id &&
        typeof brief.title === "string" && typeof brief.outline === "string";
    }).map(cloneBrief);
    if (!briefs.some(function (brief) { return brief.id === DRONE_BRIEF.id; })) {
      briefs.unshift(cloneBrief(DRONE_BRIEF));
    }
    return briefs.length ? briefs : [cloneBrief(DRONE_BRIEF)];
  } catch (err) {
    return [cloneBrief(DRONE_BRIEF)];
  }
}

function saveBriefs(briefs) {
  localStorage.setItem(BRIEFS_KEY, JSON.stringify(briefs));
}

function createBriefId() {
  return "brief-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}
