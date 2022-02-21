import messages from './validators.messages';

const required = (value: string) => (value ? undefined : messages.required);

export default required;
