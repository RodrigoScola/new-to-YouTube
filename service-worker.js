function execute() {
     setTimeout(() => {
          const clickEvent = new MouseEvent('click', {
               view: window,
               bubbles: true,
               cancelable: true,
          })

          const rightArrow = document.querySelector('#right-arrow-button')
          if (rightArrow) {
               rightArrow.dispatchEvent(clickEvent)
               rightArrow.dispatchEvent(clickEvent)
               rightArrow.dispatchEvent(clickEvent)
               rightArrow.dispatchEvent(clickEvent)
          }

          const element = document.querySelector(
               'yt-formatted-string[title="New to you"]'
          )
          if (element) {
               const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
               })
               element.dispatchEvent(clickEvent)
          }
     }, 100)
}

// chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
//      if (details.url.includes('youtube.com')) {
//           chrome.scripting.executeScript({
//                target: { tabId: details.tabId },
//                func: reddenPage,
//           })
//      }
// })
chrome.webNavigation.onCompleted.addListener((details) => {
     if (details.url.includes('youtube.com')) {
          chrome.scripting.executeScript({
               target: { tabId: details.tabId },
               func: execute,
          })
     }
})
chrome.action.onClicked.addListener((tab) => {
     if (!tab || !tab.url || !tab.id) return

     if (!tab.url.includes('chrome://')) {
          chrome.scripting.executeScript({
               target: { tabId: tab.id },
               func: execute,
          })
     }
})

