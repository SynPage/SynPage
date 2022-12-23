export async function getCurrentTab() {
  let queryOptions = { active: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs?.query(queryOptions);
  return tab;
}

export async function getAllTabs() {
  let queryOptions = {};
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  return chrome.tabs?.query(queryOptions);
}