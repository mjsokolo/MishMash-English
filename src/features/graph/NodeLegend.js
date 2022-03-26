import React from 'react';
import propTypes from 'prop-types';
import { ContextMenuTrigger } from 'react-contextmenu';
import { useSelector } from 'react-redux';
import { REMOVE_BOX_MENU_ID } from './GraphContextMenu';

export default function NodeLegend({ id }) {
  return (
    <>
      <BoxLegend id={id} />
      <ArrowLegend id={id} />
    </>
  );
}
NodeLegend.propTypes = {
  id: propTypes.string.isRequired,
};

export function BoxLegend({ id }) {
  const boxLabels = useSelector(
    (state) => state.blocks.present.graph.boxes[id]
  );
  // create box legend
  let boxLegend = <></>;
  if (Array.isArray(boxLabels)) {
    boxLegend = boxLabels.map((label) => (
      <div className="box-label" nodeid={id}>
        <ContextMenuTrigger
          id={REMOVE_BOX_MENU_ID}
          key={id + label}
          holdToDisplay={-1}
          label={label}
        >
          <div nodeid={id} nodelabel={label}>
            {` ⬛ ${label}`}
          </div>
        </ContextMenuTrigger>
      </div>
    ));
    return <div className="box-legend">{boxLegend}</div>;
  }
  return null;
}
BoxLegend.propTypes = {
  id: propTypes.string.isRequired,
};

export function ArrowLegend({ id }) {
  const connections = useSelector(
    (state) => state.blocks.present.graph.connections
  );
  // collect arrow labels associated with node
  const connectionLabels = connections
    .filter((c) => c[0] === id)
    .map((c) => c[2]);
  // create arrow legend
  let arrowLegend = '';
  if (connections) {
    arrowLegend = connectionLabels.map((label) => (
      <div className="arrow-label" nodeid={id}>
        {` ◀️ ${label}`}
      </div>
    ));
    return <div className="arrow-legend">{arrowLegend}</div>;
  }
  return null;
}
ArrowLegend.propTypes = {
  id: propTypes.string.isRequired,
};
