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
  const isComplete = complete >= num;
  const isCurStep = curStep === num;
  return (
    <div className="md:text-left">
      <h3
        className={`flex items-center gap-1 md:text-xs lg:text-base ${isCurStep || isComplete ? 'text-cyan-500' : 'text-black dark:text-white'}`}
      >
        <span className="xxs:hidden md:block">{label}</span>
        {isComplete && <Check className="h-6 w-6 text-cyan-500" />}
      </h3>

      <span className={`step__tracker ${isComplete ? 'done' : ''}`}></span>
    </div>
  );
};

export default Tracker;
