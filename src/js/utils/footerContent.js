import twitterIcon from "../../assets/icons/twitter.svg";
import facebookIcon from "../../assets/icons/fb.svg";
import thcIcon from "../../assets/icons/3hc.svg";
import githubIcon from "../../assets/icons/github.svg";
import licenseIcon from "../../assets/icons/mitLicense.svg";

const footerContent = {
	ssnnItems: [
		{
			name: "twitter",
			icon: twitterIcon
		},
		{
			name: "facebook",
			icon: facebookIcon
		},
		{
			name: "github",
			icon: githubIcon
		}
	],
	terms: [
		{
			title: "To people",
			contents: [
				"Follow repo instructions to clone and use routine-tracker. It is free to use. I hope it helps you with whatever journey or struggle you're in.",
				"Eventually I'll be able to deploy a server and keep a free service on the web so you can use this like any regular web app."
			]
		},
		{
			title: "To devs and related",
			contents: [
				"Tintrack was created as a school project that then became an idea for a personal tool in order to have an impact in my own habits and feelings. As human beings struggle with life situations they may fall in emotional chaos or philosophical voids, both contexts that make it hard for us to effectively use our willpower to make decisions and act towards our happiness and personal peace.",
				"Because this is a tool built with a humane purpose, I curse you if you charge people for using this personally as they struggle through deppresion, maniac episodes, obsesive behaviours or just plain old inhabilitating anxiety.",
				"This can, though, be used as a tool for health proffessionals in order to follow up on their patients and generate statistic data that could help us all move forwards in emotional and psycological sciences. If you decide to use this as a platform to provide a SaaS tool for this end, then you have my permission to charge these professionals and private institutions as they are your clients and will use this tool to do a better job and provide a better healthcare service."
			]
		}
	],
	copyrights: {
		texts: ["MIT License", "Copyright (c) 2019 Ernesto Medina"],
		icon: licenseIcon,
		createdBy: "Ernesto Medina",
		builtBy: "Ernesto Medina",
		poweredBy: thcIcon
	}
};

export default footerContent;
