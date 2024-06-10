chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "copyTextWithUrl",
      title: "复制文本并附带网址",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyTextWithUrl") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: copyTextWithUrl,
        args: [info.selectionText, tab.url]
      });
    }
  });
  
  function copyTextWithUrl(selectedText, pageUrl) {
    const textToCopy = `${selectedText}\n\n来源: ${pageUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
  