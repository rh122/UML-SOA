/* New key so briefs saved under uml-soa-briefs are ignored. */
var BRIEFS_KEY = "uml-soa-briefs-2";

function cloneBrief(brief) {
  return { id: brief.id, title: brief.title, outline: brief.outline };
}

function loadBriefs() {
  try {
    var raw = localStorage.getItem(BRIEFS_KEY);
    if (!raw) return [];
    var data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(function (brief) {
      return brief && typeof brief.id === "string" && brief.id &&
        typeof brief.title === "string" && typeof brief.outline === "string";
    }).map(cloneBrief);
  } catch (err) {
    return [];
  }
}

function saveBriefs(briefs) {
  localStorage.setItem(BRIEFS_KEY, JSON.stringify(briefs));
}

function createBriefId() {
  return "brief-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}
