import { useEffect, useState } from 'react';
import Button from './atom/Button';
import useFormHook from './customHooks/formHook';
import Tracker from './atom/Tracker';
import Modal from './molecule/Modal';
import { fields, tracks } from './constant';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import './App.scss';

function App() {
  const [step, setStep] = useState(1);
  const [complete, setComplete] = useState(0);
  const [open, setOpen] = useState(true);

  const { ifError, getValues, resetData, onInputChange, onInputBlur, inputs } =
    useFormHook(fields, step);

  const theme = inputs.theme.value;

  const [subscribe, setSubscribe] = useState(false);

  const onSubscribe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e?.target;

    setSubscribe(checked);
  };

  const onNavigate = (direction: 'next' | 'back') => {
    if (direction === 'next') {
      if (step === complete) return setStep((step) => step + 1);
      if (ifError()) {
        return false;
      }
      if (step !== complete) return setComplete((complete) => complete + 1);
    } else {
      setStep((step) => step - 1);
    }
  };

  useEffect(() => {
    if (complete > 0) setStep((step) => step + 1);
  }, [complete]);

  useEffect(() => {
    if (complete < 3 || step < 3) return;
    const handler = setTimeout(() => {
      const data = getValues();
      data.subscribe = subscribe;
      alert(`ONBOARDING SUCCESSFUL!\n ${JSON.stringify(data)}`);
      setOpen(false);
      resetData();
      setStep(1);
      setComplete(0);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [complete, theme]);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.toggle('dark');
  }, [theme]);

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#f5f5f5]">
      {!open && (
        <Button className="start" onClick={() => setOpen(true)}>
          Start Onboarding
        </Button>
      )}

      <Modal open={open}>
        <div className="onboard_container">
          <form className="bg-white text-black dark:bg-gray-900 dark:text-white">
            <h2 className="mb-10">Complete your registration</h2>
            <section className="mb-5 grid grid-cols-3 items-end gap-2">
              {tracks.map((item: any, i: number) => (
                <Tracker
                  key={i}
                  num={item?.step}
                  curStep={step}
                  complete={complete}
                  label={item?.label}
                />
              ))}
            </section>

            {step === 1 && (
              <>
                <Step1
                  inputs={inputs}
                  onInputChange={onInputChange}
                  onInputBlur={onInputBlur}
                />
              </>
            )}
            {step === 2 && (
              <>
                <Step2
                  inputs={inputs}
                  onInputChange={onInputChange}
                  onInputBlur={onInputBlur}
                />
              </>
            )}
            {step >= 3 && (
              <>
                <Step3
                  inputs={inputs}
                  onInputChange={onInputChange}
                  onInputBlur={onInputBlur}
                  onSubscribe={onSubscribe}
                  checked={subscribe}
                />
              </>
            )}
            <div className="mt-10 flex">
              {step > 1 && (
                <Button type="button" onClick={() => onNavigate('back')}>
                  Back
                </Button>
              )}

              <Button
                className="ml-auto"
                type="button"
                onClick={() => onNavigate('next')}
                disabled={step > 3}
              >
                {step > 3 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </main>
  );
}

export default App;
