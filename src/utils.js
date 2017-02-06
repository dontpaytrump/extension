import URI from 'urijs'
import Raven from 'raven-js'

Raven
.config('https://9c0d2fc5076b427695d4f6663958a687@sentry.io/135867')
.install()

export const logException = err => Raven.captreException(err)

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
		logException(err)
		return reject(new Error('Failed to get the current domain. Details: ', err))
	}
})

/**
 * gets the current values in the setting object
 */

export const getSettings = () => {
	try {
		const settings = localStorage.getItem('settings')
		return settings
			? JSON.parse(settings)
			: {}
	} catch (err) {
		logException(err)
		return new Error('Failed to parse the settings object or return a plain object. Details: ', err)
	}
}

/**
 * gets the company object based on the domain
 */

export const getCompany = domain => stores[domain]
