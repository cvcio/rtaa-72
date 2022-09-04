import {
	truncate
} from 'lodash';

const getRole = (profile) => {
	if (!profile || !profile.roles) return 100;

	if (profile.roles.includes('ADMIN')) {
		return 0;
	} else if (profile.roles.includes('ORGADMIN')) {
		return 10;
	} else if (profile.roles.includes('POWERUSER')) {
		return 20;
	} else if (profile.roles.includes('USER')) {
		return 30;
	} else {
		return 100;
	}
};

const getFavicon = (url) => {
	return `https://www.google.com/s2/favicons?domain=${url}`;
};

const getIcon = (t) => {
	switch (t) {
	case 'article':
		return 'mdi-file-document-outline';
	case 'author':
		return ' mdi-fountain-pen-tip';
	case 'entity':
		return 'mdi-tag-text';
	case 'feed':
		return 'mdi-web';
	default:
		return 'mdi-file-document-outline';
	}
};

const shorten = (value, length = 20) => {
	let result = '';
	const characters = value.split(' ').join('');
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const ellipsis = (value, l = 120) => {
	if (!value) return '';
	if (value.length < l) return value;
	return truncate(value, {
		omission: ' [...] ',
		length: (l / 2)
	}) + value.substring(value.length - (l / 2), value.length);
};

const parseJWT = (t) => {
	try {
		const base64Url = t.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	} catch {
		return null;
	}
};

const capitalizeText = (str) => {
	return str.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
};

const getColor = (t) => {
	// let colors = ['#1DA1F2', '#FFEA00', '#F4511E', '#19CF86'];
	switch (t.toLowerCase()) {
	case 'tweet':
	case 'tweets':
		return '#0F0F18'; // '#000';// 'url(#diagonal-stripe-5)';
	case 'retweet':
	case 'retweets':
		return '#bdbdbd'; // '#bdbdbd';
	case 'quote':
	case 'quotes':
		return '#ccc'; // ''#ccc';
	case 'reply':
	case 'replies':
		return '#888'; // #888';
	case 'active':
		return 'blue accent-4 white--text'; // #888';
	case 'new':
		return 'yellow darken-2'; // #888';
	case 'unknown':
		return 'grey white--text'; // #888';
	case 'influencer':
		return 'light-green accent-3'; // #888';
	case 'potential fake':
	case 'amplifier':
		return 'red white--text'; // #888';

	case 'obscene':
	case 'insult':
		return 'yellow'; // #888';
	case 'toxicity':
	case 'identity_attack':
	case 'threat':
		return 'orange white--text'; // #888';
	case 'severe_toxicity':
		return 'red white--text'; // #888';
	default:
		return '#0F0F18';
	}
};

const getHEXColor = (t) => {
	// let colors = ['#1DA1F2', '#FFEA00', '#F4511E', '#19CF86'];
	switch (t.toLowerCase()) {
	case 'tweet':
	case 'tweets':
		return '#0F0F18'; // '#000';// 'url(#diagonal-stripe-5)';
	case 'retweet':
	case 'retweets':
		return '#bdbdbd'; // '#bdbdbd';
	case 'quote':
	case 'quotes':
		return '#ccc'; // ''#ccc';
	case 'reply':
	case 'replies':
		return '#888'; // #888';
	case 'potential fake':
	case 'amplifier':
	case 'toxic':
		return '#ED2038'; // #888';
	case 'new':
		return '#F9A825';
	default:
		return '#0F0F18';
	}
};

export {
	getRole,
	getFavicon,
	getIcon,
	getColor,
	parseJWT,
	capitalizeText,
	getHEXColor,
	shorten,
	ellipsis
};
