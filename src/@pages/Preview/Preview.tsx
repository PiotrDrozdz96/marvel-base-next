import { Fragment } from 'react';
import classNames from 'classnames';
import { IoSave, IoArrowUp, IoArrowDown } from 'react-icons/io5';

import { Volume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import { Filters } from 'types/Filter';
import routes from 'config/routes';
import Link from '@components/Link';
import Collapsible from '@components/Collapsible';
import Checkbox from '@components/Checkbox';
import Book from '@components/Book';
import Button from '@components/Button';

import { getWaveCheckboxHref, getSerieCheckboxHref, getSearchParams } from './Preview.utils';
import classes from './Preview.module.scss';
import messages from './Preview.messages';

type Props = {
  items: (Volume | Notebook)[];
  databaseName: string;
  filters: Filters[];
  wavesIds: string[];
  seriesIds: string[];
};

const Preview = ({ items, databaseName, filters, wavesIds, seriesIds }: Props): JSX.Element => (
  <div className={classes.preview}>
    <div className={classes.filters}>
      <div className={classes.filtersHeader}>{messages.filters}</div>
      <div className={classes.filtersOptions}>
        <div className={classes.link}>
          <Link href={`/preview/${databaseName}`}>{messages.clear}</Link>
        </div>
        <div className={classes.link}>
          <Link href={`/preview/${databaseName}?wavesIds=[${filters.map(({ id }) => id)}]`}>{messages.showAll}</Link>
        </div>
      </div>
      <div className={classes.checkboxes}>
        {filters.map((filter) => (
          <Fragment key={filter.id}>
            <Link href={getWaveCheckboxHref(databaseName, filters, wavesIds, seriesIds, filter.checked, filter.id)}>
              <Checkbox key={filter.id} id={filter.id} checked={filter.checked} label={filter.name} />
            </Link>
            {!!filter.series.length && (
              <Collapsible
                className={classes.collapse}
                trigger={{
                  opened: (
                    <>
                      {messages.collapse}
                      <IoArrowUp />
                    </>
                  ),
                  closed: (
                    <>
                      {messages.expand}
                      <IoArrowDown />
                    </>
                  ),
                }}
              >
                <div className={classNames(classes.checkboxes, classes.seriesCheckboxes)}>
                  {filter.series.map((serie) => (
                    <Link
                      key={serie.id}
                      href={getSerieCheckboxHref(
                        databaseName,
                        filters,
                        wavesIds,
                        seriesIds,
                        serie.checked,
                        filter.id,
                        serie.id
                      )}
                    >
                      <Checkbox id={serie.id} checked={serie.checked} label={serie.name} />
                    </Link>
                  ))}
                </div>
              </Collapsible>
            )}
          </Fragment>
        ))}
      </div>
      <Button
        type="link"
        icon={<IoSave />}
        className={classes.saveButton}
        href={{
          pathname: routes.aliases.create.href,
          query: { databaseName, params: getSearchParams(wavesIds, seriesIds) },
        }}
      >
        {messages.saveAlias}
      </Button>
    </div>
    <div className={classes.content}>
      {items.map((item, index) => (
        <Link
          key={item.id}
          className={classes.previewElement}
          href={{
            pathname: routes.volumes.id.show.href,
            query: { databaseName, id: item.id },
          }}
        >
          <Book {...item} priority={index <= 21} />
        </Link>
      ))}
    </div>
  </div>
);

export default Preview;
