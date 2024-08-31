function reddenPage() {
     const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
     })
     const int = setInterval(() => {
          const rightArrow = document.querySelector('#right-arrow-button')
          const element = document.querySelector(
               'yt-formatted-string[title="New to you"]'
          )
          if (!rightArrow || !element) {
               console.error('page has not loaded probably, trying again')
               return
          }
          //sometimes youtube thinks that were a bot and goes back to the all tab so we need to click the right arrow a few times
          rightArrow.dispatchEvent(clickEvent)
          rightArrow.dispatchEvent(clickEvent)
          rightArrow.dispatchEvent(clickEvent)
          element.dispatchEvent(clickEvent)
          rightArrow.dispatchEvent(clickEvent)
          clearInterval(int)
     }, 100)
}

chrome.webNavigation.onCompleted.addListener((details) => {
     if (details.url.includes('youtube.com')) {
          chrome.scripting.executeScript({
               target: { tabId: details.tabId },
               func: reddenPage,
          })
     }
})
chrome.action.onClicked.addListener((tab) => {
     if (!tab || !tab.url || !tab.id) return

     if (!tab.url.includes('chrome://')) {
          chrome.scripting.executeScript({
               target: { tabId: tab.id },
               func: reddenPage,
          })
     }
})

