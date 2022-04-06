export default {
  get: 'Only GET requests allowed',
  post: 'Only POST requests allowed',
  delete: 'Only DELETE requests allowed',
  postAndDelete: 'Only POST and DELETE requests allowed',
  genericNotFound: '{name} not found',
  notFound: 'Record of id "{id}" not found in table "{basename}"',
  conflict: 'Record of id "{id}" exists in table "{basename}',
  internal: 'Internal Error',
  required: 'field "{field}" is required',
  mustBeType: 'field "{field}" must by type of {type}',
  includes: 'field "{field}" must be one of [{options}]',
  relations: 'field "{field}" equal {value} not found relation with {baseName}',
};
