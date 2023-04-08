export async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0];
}

export async function getAllTabs() {
  let queryOptions = {};
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  return chrome.tabs.query(queryOptions);
}
