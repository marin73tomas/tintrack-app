export const validateString = ({
	item,
	allowNumbers = true,
	minLength = 0,
	maxLength = 240
}) => {
	let value = item.trim();
	let isValid = false;
	let error = "";
	// console.log("validating ", value);
	if (typeof value != "string") {
		error = "item must be of type string.";
		return {
			value,
			isValid,
			error
		};
	}
	if (!allowNumbers && /\d/.test(value)) {
		error = "item may not contain digits.";
		return {
			value,
			isValid,
			error
		};
	}
	if (minLength > 0 && value.length < minLength) {
		error = "item must be at least " + minLength + " characters long.";
		return {
			value,
			isValid,
			error
		};
	}
	if (value.length > maxLength) {
		error = "item must be shorter than " + maxLength + " characters.";
		return {
			value,
			isValid,
			error
		};
	}
	isValid = true;
	return {
		value,
		isValid,
		error
	};
};

export const validateNumber = ({
	item,
	minQty = parseInt(item) - 1,
	maxQty = parseInt(item) + 1
}) => {
	// console.log("starting number validation for ", item, " type ", typeof item);
	// console.log("is nan? ", isNaN(item));
	if (isNaN(item)) {
		return {
			value: item,
			isValid: false,
			error: "item must be a number"
		};
	}
	let value = parseInt(item);
	if (value < minQty || value > maxQty) {
		return {
			value: value,
			isValid: false,
			error: minQty + " < item < " + maxQty
		};
	}
	return {
		value,
		isValid: true,
		error: ""
	};
};

export const validateEmailSyntax = ({ item, maxLength = 250 }) => {
	let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let value = String(item).toLowerCase();
	let isValid = false;
	let error = "";
	if (re.test(value)) {
		isValid = true;
	} else {
		error = "email syntax is not valid!";
	}
	return {
		value,
		isValid,
		error
	};
};

export const validateDate = ({ item, rule }) => {
	let ruleResult = rule(item);
	return {
		value: item,
		isValid: ruleResult.isValid,
		error: ruleResult.error
	};
};
