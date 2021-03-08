export const FeelingEnum = {
	SADDER: 1,
	SAD: 2,
	INDIFFERENT: 3,
	HAPPY: 4,
	HAPPIER: 5,
	feelings: {
		1: {
			name: "sadder",
			value: 1
		},
		2: {
			name: "sad",
			value: 2
		},
		3: {
			name: "indifferent",
			value: 3
		},
		4: {
			name: "happy",
			value: 4
		},
		5: {
			name: "happier",
			value: 5
		}
	},
	getFeelingValue: feelingString => {
		for (let feeling in FeelingEnum.feelings) {
			if (FeelingEnum.feelings[feeling].name == feelingString) {
				return FeelingEnum.feelings[feeling].value;
			}
		}
		return 0;
	}
};
