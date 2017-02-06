export default class Content {
	constructor() {
		chrome.runtime.onMessage.addListener(::this.handleMessage)
	}

	handleMessage(event, sender) {
		if (NODE_ENV === 'development') {
			console.info(`LOG: message ${event} from ${sender}`)
		}
	}

	render() {
		const iframe = document.createElement('iframe')
		iframe.src = ''
		return document.appendChild(iframe)
	}
}
