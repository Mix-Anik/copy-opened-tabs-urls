document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copy-btn');
	
    copyBtn.addEventListener('click', async () => {
		const urlsTextarea = document.getElementById('urls-textarea');
		const urlRegEx = makeRegEx('url-regex');
		const urls = await getTabsUrls(urlRegEx);
		
		urlsTextarea.textContent = urls;
		urlsTextarea.select();
		document.execCommand('copy');
		urlsTextarea.blur();
    });
});

async function getTabsUrls(urlRegex) {
	var result = [];
	const windowTabs = await chrome.tabs.query({});
	
	for (const wt of windowTabs) {
		if(urlRegex && !urlRegex.test(wt.url))
			continue
		
		result.push(wt.url);
	}
	
	return result.join('\n');
}


function makeRegEx(elemId) {
	const inputElem = document.getElementById(elemId);
	const pattern = inputElem.value;
	
	if(pattern == null || pattern == "")
		return null;
	
	try {
		const regex = new RegExp(pattern, "");
		inputElem.setCustomValidity('');
		
		return regex;
	} catch (err) {
		inputElem.setCustomValidity('Invalid RegEx expression! Ignoring..');
		
		return null;
	}
}
