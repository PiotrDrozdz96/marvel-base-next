import messages from './validators.messages';

const required = (value: string | number | Date) => (value || value === 0 ? undefined : messages.required);

export default required;
