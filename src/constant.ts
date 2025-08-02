const tracks = [
  {
    step: 1,
    label: 'Personal Information',
  },
  {
    step: 2,
    label: 'Account Setup',
  },
  {
    step: 3,
    label: 'Preference',
  },
];

const fields = {
  fullName: {
    name: 'fullName',
    value: '',
    placeholder: 'Enter fullname',
    required: true,
    error: '',
    type: 'text',
    step: 1,
  },
  email: {
    name: 'email',
    value: '',
    placeholder: 'Enter email address',
    required: true,
    error: '',
    type: 'email',
    step: 1,
  },
  userName: {
    name: 'userName',
    value: '',
    placeholder: 'Enter username',
    required: true,
    error: '',
    type: 'text',
    step: 2,
  },
  password: {
    name: 'password',
    value: '',
    placeholder: 'Enter password',
    required: true,
    error: '',
    type: 'password',
    step: 2,
  },
  theme: {
    name: 'theme',
    value: '',
    placeholder: '',
    required: false,
    error: '',
    type: 'select',
    options: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
    step: 3,
  },
};

export { tracks, fields };
