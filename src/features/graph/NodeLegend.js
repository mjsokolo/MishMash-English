import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ContextMenuTrigger } from 'react-contextmenu';
import { REMOVE_BOX_MENU_ID } from './GraphContextMenu';
import { legendColor } from './helpers';

export default function NodeLegend({ id }) {
  // collect box labels associated with node
  const boxLabels = useSelector(
    (state) => state.blocks.present.graph.boxes[id]
  );
  // collect arrow labels associated with node
  const connections = useSelector(
    (state) => state.blocks.present.graph.connections
  );
  const connectionLabels = connections
    .filter((c) => c[0] === id)
    .map((c) => c[2]);
  // calculate legend color
  const color = legendColor({ boxLabels, connectionLabels });

  return (
    <legend className="legend" style={{ color }}>
      <ArrowLegend connectionLabels={connectionLabels} id={id} />
      <BoxLegend boxLabels={boxLabels} id={id} />
    </legend>
  );
}
NodeLegend.propTypes = {
  id: propTypes.string.isRequired,
};

export function BoxLegend({ boxLabels, id }) {
  // create box legend
  let boxLegend = <></>;
  if (Array.isArray(boxLabels)) {
    boxLegend = boxLabels.map((label) => (
      <div className="box-label" nodeid={id} key={id + label}>
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
  boxLabels: propTypes.arrayOf(propTypes.string).isRequired,
};

export function ArrowLegend({ connectionLabels, id }) {
  // create arrow legend
  let arrowLegend = '';
  if (connectionLabels) {
    arrowLegend = connectionLabels.map((label) => (
      <div className="arrow-label" nodeid={id} key={id + label}>
        {` ◀️ ${label}`}
      </div>
    ));
    return <div className="arrow-legend">{arrowLegend}</div>;
  }
  return null;
}
ArrowLegend.propTypes = {
  id: propTypes.string.isRequired,
  connectionLabels: propTypes.arrayOf(propTypes.string).isRequired,
};
