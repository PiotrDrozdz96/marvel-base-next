'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';

import classes from 'styles/filters.module.scss';
import { Form } from '@lib/react-final-form';
import Input from '@components/Input';

import { NotebooksContext } from '../NotebooksProvider';
import notebooksMessages from '../Notebooks.messages';
import { FormValues } from './NotebooksGrabList.types';
import { grabNotebooks } from './NotebooksGrabList.actions';

const NotebooksFilters = () => {
  const { setNotebooks } = useContext(NotebooksContext);

  const onSubmit = async (values: FormValues) => {
    const newNotebooks = await grabNotebooks(values);

    setNotebooks(newNotebooks || []);
  };

  return (
    <Form<FormValues> initialValues={{ url: '', from: '', to: '' }} onSubmit={(values) => onSubmit(values)}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={classes.filters}>
          <Input name="url" placeholder={notebooksMessages.url} onBlur={handleSubmit} />
          <Input name="from" placeholder={notebooksMessages.from} onBlur={handleSubmit} />
          <Input name="to" placeholder={notebooksMessages.to} onBlur={handleSubmit} />
          <button type="submit" style={{ display: 'none' }} />
        </form>
      )}
    </Form>
  );
};

export default NotebooksFilters;
