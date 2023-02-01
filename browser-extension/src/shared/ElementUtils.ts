export class ElementUtils {
	static getTargetElement = (selector: string) => {
		return document.querySelector(selector);
	}
}
