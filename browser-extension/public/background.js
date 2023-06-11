chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ])
  })
})

console.log('Background script loaded.')

self.addEventListener('install', (event) => {
  console.log('Service worker installed.')
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activated.')
})
