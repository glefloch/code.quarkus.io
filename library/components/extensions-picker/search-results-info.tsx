import React, { SetStateAction } from 'react';
import { clearFilterOrigin, FilterResult } from './extensions-utils';
import classNames from 'classnames';
import { FaCheck } from 'react-icons/fa';
import { Alert, Button } from 'react-bootstrap';
import './search-results-info.scss';
import { DEFAULT_FILTER } from '../api/quarkus-project-utils';

export function SearchResultsInfo(props: { filter: string; setFilter: React.Dispatch<SetStateAction<string>>, result: FilterResult }) {
  function clickPlatform() {
    if (props.result.origin !== 'platform') {
      props.setFilter(`origin:platform ${clearFilterOrigin(props.filter)}`);
    } else {
      props.setFilter(`origin:any ${clearFilterOrigin(props.filter)}`);
    }
  }
  function clickOther() {
    if (props.result.origin !== 'other' ) {
      props.setFilter(`origin:other ${clearFilterOrigin(props.filter)}`);
    } else {
      props.setFilter(`origin:any ${clearFilterOrigin(props.filter)}`);
    }
  }
  function clearFilters() {
    props.setFilter(DEFAULT_FILTER);
  }
  const origin = props.result?.origin;
  const originOther =  origin === 'other' ;
  const originPlatform =  origin === 'platform';
  return (
    <>
      {props.result?.filtered && (
        <>
          <div className="search-results-info">
            {props.result.any.length === 0 && <b>No extensions found </b>}
            {props.result.any.length > 0 && (
              <span className='origins-count'>
                <span className='results'>Extensions found by origin: </span>
                <span className={classNames('origin-count', 'platform-origin', { 'current-origin': originPlatform })} onClick={clickPlatform}>
                  {originPlatform && <FaCheck />}<span className='count'>{props.result.platform.length}</span> Platform
                </span>
                <span className={classNames('origin-count', 'other-origin', { 'current-origin': origin === 'other' })} onClick={clickOther}>
                  {originOther && <FaCheck />}<span className='count'>{props.result.other.length}</span> Other
                </span>
              </span>
            )}
            <Button as="a" className='clear-button' onClick={clearFilters}>Clear filters</Button>
          </div>
          {props.result.selected.length === 0 && props.result.other.length > 0 && (
            <Alert variant="info" className="search-results-alert">
               No extensions found in the platform. <Button as="a" onClick={clickOther}>Click here to see {props.result.other.length} extensions from other origins</Button>.
            </Alert>
          )}
          {props.result.selected.length === 0 && props.result.platform.length > 0 && (
            <Alert variant="info" className="search-results-alert">
              No extensions found in other origins. <Button as="a" onClick={clickPlatform}>Click here to see {props.result.platform.length} extensions from the platform</Button>.
            </Alert>
          )}
        </>
      )}
    </>
  )
}
