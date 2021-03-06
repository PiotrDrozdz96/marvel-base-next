import { Fragment } from 'react';
import classNames from 'classnames';
import { IoSave, IoArrowUp, IoArrowDown } from 'react-icons/io5';

import { FrontVolume, Volume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import { Filters } from 'types/Filter';
import routes from 'config/routes';
import Link from '@components/Link';
import Collapsible from '@components/Collapsible';
import Checkbox from '@components/Checkbox';
import Book from '@components/Book';
import Button from '@components/Button';
import VolumesShow from '@pages/Volumes/VolumesShow';

import { getWaveCheckboxHref, getSerieCheckboxHref, getSearchParams } from './Preview.utils';
import classes from './Preview.module.scss';
import messages from './Preview.messages';

type Props = {
  items: (Volume | Notebook)[];
  databaseName: string;
  filters: Filters[];
  wavesIds: string[];
  seriesIds: string[];
  isEvent?: boolean;
  volume?: FrontVolume;
};

const Preview = ({ items, databaseName, filters, wavesIds, seriesIds, isEvent, volume }: Props): JSX.Element => {
  const alias = isEvent ? `/${volume?.id}` : '';

  return (
    <div className={classes.preview}>
      <div className={classes.filters}>
        <div className={classes.filtersHeader}>{messages.filters}</div>
        <div className={classes.filtersOptions}>
          <div className={classes.link}>
            <Link href={`/preview/${databaseName}${alias}${isEvent ? '?seriesIds=[]' : ''}`}>{messages.clear}</Link>
          </div>
          <div className={classes.link}>
            <Link href={`/preview/${databaseName}${alias}?wavesIds=[${filters.map(({ id }) => id)}]`}>
              {messages.showAll}
            </Link>
          </div>
        </div>
        <div className={classes.checkboxes}>
          {filters.map((filter) => (
            <Fragment key={filter.id}>
              <Link
                href={getWaveCheckboxHref(databaseName, alias, filters, wavesIds, seriesIds, filter.checked, filter.id)}
              >
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
                          alias,
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
      {isEvent && !!volume ? (
        <div className={classes.eventContent}>
          <VolumesShow item={volume} databaseName={databaseName} notebooks={items as Notebook[]} isPreview />
        </div>
      ) : (
        <div className={classes.content}>
          {items.map((item) => (
            <Link
              key={item.id}
              className={classes.previewElement}
              href={{
                pathname: routes.volumes.id.show.href,
                query: { databaseName, id: item.id },
              }}
            >
              <Book {...item} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Preview;
