// content images
import strength from "../../assets/icons/home-page/strength.svg";
import smart from "../../assets/icons/home-page/idea.svg";
import content from "../../assets/icons/home-page/content.svg";
import stability from "../../assets/icons/home-page/stability.svg";
import sanity from "../../assets/icons/home-page/sanity.svg";
import willpower from "../../assets/icons/home-page/willpower.svg";
import happen from "../../assets/icons/home-page/happen.svg";
import positive from "../../assets/icons/home-page/positive.svg";
import negative from "../../assets/icons/home-page/negative.svg";
import core from "../../assets/icons/home-page/core.svg";
import manage from "../../assets/icons/home-page/manage.svg";
import measure from "../../assets/icons/home-page/measure.svg";
import habit from "../../assets/icons/home-page/id-habits.svg";
import createTask from "../../assets/icons/home-page/create-task.svg";
import keepTrack from "../../assets/icons/home-page/keep-track.svg";
import stats from "../../assets/icons/home-page/stats.svg";
import improve from "../../assets/icons/home-page/improve.svg";

const homepageContent = {
	contentBlocks: [
		{
			id: 1,
			title: "Why are routines good for us?",
			kind: "card-gallery"
		},
		{
			id: 2,
			title: "Why should we care about our habits?",
			kind: "card-gallery"
		},
		{
			id: 3,
			title: "How does routine tracking work?",
			kind: "row-concepts"
		}
	],
	contentItems: [
		{
			id: 1,
			belongsTo: 1,
			title: "They make us strong",
			description:
				"Improve your physical health with routine walks, excercise sessions or sport related activities.",
			icon: strength
		},
		{
			id: 2,
			belongsTo: 1,
			title: "They make us smart",
			description:
				"Study, read, solve puzzles and crosswords on a routine basis to improve your mental performance.",
			icon: smart
		},
		{
			id: 3,
			belongsTo: 1,
			title: "They make us content",
			description:
				"Build inner peace as you engage in household tasks routines; do your bed, water your plants or sweep your room.",
			icon: content
		},
		{
			id: 4,
			belongsTo: 1,
			title: "They make us stable",
			description:
				"Eating, sleeping and taking medicines on time are important to keep our body chemistry on point!",
			icon: stability
		},
		{
			id: 5,
			belongsTo: 1,
			title: "They make us sane",
			description:
				"Build spiritual sanity from scratch upon regular praying, meditation, therapy or reflexive thinking.",
			icon: sanity
		},
		{
			id: 6,
			belongsTo: 1,
			title: "They make us",
			description:
				"Take control and overcome lack of willpower; structure your mind and own yourself, one routine at a time.",
			icon: willpower
		},
		{
			id: 7,
			belongsTo: 2,
			title: "They exist and they happen",
			description:
				"Whether consciously or unconsciously, we have acquired an amount of habits that are part of our lives and take place everyday.",
			icon: happen
		},
		{
			id: 8,
			belongsTo: 2,
			title: "They can be good for you",
			description:
				"Some habits have a positive impact on various aspects of our lives; these ones are to be enforced through routine tracking.",
			icon: positive
		},
		{
			id: 9,
			belongsTo: 2,
			title: "They can be bad for you",
			description:
				"On the other hand, some habits may have a negative impact on your life; in general, this impact is only visible in the long term.",
			icon: negative
		},
		{
			id: 10,
			belongsTo: 2,
			title: "They are our core",
			description:
				"Habits are actions that we execute without much conscious regards; in spite of what we rationally see ourselves as, our habits are our standard core operation.",
			icon: core
		},
		{
			id: 11,
			belongsTo: 2,
			title: "They can be managed",
			description:
				"Once we are aware of them, we'll realize some habits need to be added, some need to be monitored and some just need to stop happening at all!",
			icon: manage
		},
		{
			id: 12,
			belongsTo: 2,
			title: "They must be measured",
			description:
				"In order to manage our habits we need to start tracking, measuring and correlating them to circumstances or other actions; info we'll use to update our routines.",
			icon: measure
		},
		{
			id: 13,
			belongsTo: 3,
			title: "1: Identify habits",
			description:
				"Create them and add frequency and estimated amount of times you think they take place.",
			icon: habit
		},
		{
			id: 14,
			belongsTo: 3,
			title: "2: Create tasks",
			description:
				"Specify routine tasks, goals, frequency and schedule part of day for them to take place.",
			icon: createTask
		},
		{
			id: 15,
			belongsTo: 3,
			title: "3: Keep track",
			description:
				"Update completed tasks and habit happening records as you go through your daily routines.",
			icon: keepTrack
		},
		{
			id: 16,
			belongsTo: 3,
			title: "4: Act on stats",
			description:
				"Use your stats to determine which habits you want to modify; redesign your routine to enforce changes.",
			icon: stats
		},
		{
			id: 17,
			belongsTo: 3,
			title: "5. Repeat",
			description: "Keep living, keep tracking, keep improving!",
			icon: improve
		}
	],
	conceptsCard: {
		title: "0: Concepts",
		concepts: [
			{
				subtitle: "Habits",
				texts: [
					"A habit's goal is to stimulate a state (happiness, pleasure, relax) or to have impact on a specific aspect of our life (health, order, stamina).",
					"When you register a habit ocurrence it will be related to some circumstance or activity you consider somehow relevant for it to have taken place; this could be another habit, a routine task or an unlisted activity which later may be added as one of them."
				]
			},
			{
				subtitle: "Routines",
				texts: [
					"A routine must also have a goal, whether it is to create or modify a habit, or to stimulate a state or circumnstance (some are only necessary for an amount of time, like some medical treatments or seasonal activities).",
					"As you mark tasks as done, different rewards will be awarded depending on your settings and how you have performed against your routines."
				]
			}
		]
	}
};

export default homepageContent;
