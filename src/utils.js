import URI from 'urijs'

/**
 * gets the domain of the currently focused window and tab, returns the domain value or an error
 *
 * @returns {String,Error} either the uri of the currently focused domain or an error
 */

export const getCurrentDomain = () => new Promise((resolve, reject) => {
	try {
		chrome.tabs.query(
			{
				currentWindow: true,
				active: true,
			},
			tabs => {
				return resolve(new URI(tabs[0].url).domain())
			},
		)
	} catch (err) {
		return reject(new Error('Failed to get the current domain'))
	}
})
