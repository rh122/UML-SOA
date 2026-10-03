/* Open-day example. Shown even when localStorage is empty. */
var DRONE_BRIEF = {
  id: "drone-response",
  title: "DroneResponse",
  outline: "Drones help a team search for a missing person and carry a needed item to a chosen place. The team starts the mission, the drones fly it, and the team hears what was found and when the job is done."
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
