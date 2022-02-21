import messages from './validators.messages';

const required = (value: string | number) => (value || value === 0 ? undefined : messages.required);

export default required;
