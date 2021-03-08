export const returnMonthName = monthIndex => {
	const monthNames = [
		"jan.",
		"feb.",
		"mar.",
		"apr.",
		"may",
		"jun.",
		"jul.",
		"aug.",
		"sep.",
		"oct.",
		"nov.",
		"dec."
	];
	return monthNames[monthIndex];
};

export const numberToDigits = number => {
	let stringNumber = number.toString();
	let digits = [];
	if (stringNumber.length === 1) {
		digits.push(0);
	}
	for (let i = 0; i < stringNumber.length; i++) {
		digits.push(parseInt(stringNumber[i]));
	}
	return digits;
};

export const digitsToNumber = digits => {
	let numberString = "";
	for (let i = 0; i < digits.length; i++) {
		numberString += digits[i].toString();
	}
	return parseInt(numberString);
};

export const ordinalInteger = number => {
	var j = number % 10,
		k = number % 100;
	if (j == 1 && k != 11) {
		return number + "st";
	}
	if (j == 2 && k != 12) {
		return number + "nd";
	}
	if (j == 3 && k != 13) {
		return number + "rd";
	}
	return number + "th";
};

export const addDaysToDate = (objWithDate, daysToAdd) => {
	let modifiedDate = new Date(
		objWithDate.year,
		objWithDate.month - 1,
		objWithDate.day
	);
	modifiedDate.setDate(modifiedDate.getDate() + daysToAdd);
	return {
		year: modifiedDate.getFullYear(),
		month: modifiedDate.getMonth() + 1,
		day: modifiedDate.getDate()
	};
};

export const toListWithoutId = listObjectsWithId => {
	let newList = [];
	for (let listedDay of listObjectsWithId) {
		let newTimeList = [];
		for (let listedTime of listedDay) {
			newTimeList.push(listedTime.value);
		}
		newList.push(newTimeList.sort());
	}
	return newList;
};

export const toListWithId = listOfLists => {
	let newList = [];
	for (let listedDay of listOfLists) {
		let newTimeObjectList = [];
		for (let listedTime of listedDay) {
			newTimeObjectList.push({
				id: Math.floor(Math.random() * 10000 + 500),
				value: listedTime
			});
		}
		newList.push(newTimeObjectList.sort());
	}
	return newList;
};

export const matchWeeksDaysTimes = (listOfWeeksOne, listOfWeeksTwo) => {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 7; j++) {
			if (listOfWeeksOne[i][j].length === listOfWeeksTwo[i][j].length) {
				for (let k = 0; k < listOfWeeksOne[i][j].length; k++) {
					if (listOfWeeksOne[i][j][k] != listOfWeeksTwo[i][j][k]) {
						return false;
					}
				}
			} else {
				return false;
			}
		}
	}
	return true;
};

export const getCsrfFromCookie = name => {
	// get csrf string from csrf cookie and return...
	let cookieValue = null;
	if (document.cookie && document.cookie !== "") {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === name + "=") {
				cookieValue = decodeURIComponent(
					cookie.substring(name.length + 1)
				);
				break;
			}
		}
	}
	return cookieValue;
};
