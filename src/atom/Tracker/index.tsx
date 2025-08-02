import React from 'react';
import './tracker.scss';
import Check from '../Icon/Check';

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
        className={`flex items-center gap-1 md:text-xs lg:text-base ${curStep === num ? 'text-cyan-500' : 'text-[#5d5d55]'}`}
      >
        <span className="xxs:hidden md:block">{label}</span> <Check />
      </h3>

      <span className={`step__tracker ${complete >= num ? 'done' : ''}`}></span>
    </div>
  );
};

export default Tracker;
