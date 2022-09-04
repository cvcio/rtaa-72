export default {
	required: value => !!value || 'Field required',
	password: value => value.length >= 8 || 'Stronger password required',
	email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || 'E-mail must be valid',
	mobile: value => /^(\+\d{1,3}[- ]?)?\d{4}?[- ]?\d{3}?[- ]?\d{3}$/.test(value) || 'Mobile must be valid',
	url: value => /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(value) || 'URL must be valid',
	pin: value => (value && value.length === 7) || 'Verification code is exact 7 digits',
	cc: value => value.length === 19 || 'CC Number code is exact 16 digits',
	passwordConfirm: (a, b) => a === b || 'Password must match'
};
