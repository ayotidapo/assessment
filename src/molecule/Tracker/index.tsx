import React from 'react';
import './tracker.scss';

interface Props {
  num: number;
  complete: number;
  curStep: number;
  label: string;
}

const Tracker: React.FC<Props> = (props) => {
  const { complete, curStep, num, label } = props;
  return (
    <div className="md:text-left">
      <h3
        className={`xxs:text-[8px] xs:text-[14px] md:text-base ${curStep === num ? 'text-cyan-500' : 'text-[#5d5d55]'}`}
      >
        {label}
      </h3>
      <span className={`step__tracker ${complete >= num ? 'done' : ''}`}></span>
    </div>
  );
};

export default Tracker;
