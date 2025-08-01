import { useEffect, useState } from 'react';
import Input from './atom/Input';
import Button from './atom/Button';
import Select from './atom/Select';
import Checkbox from './atom/Checkbox';
import useFormHook from './customHooks/formHook';
import Tracker from './molecule/Tracker';
import Modal from './molecule/Modal';
import { fields, tracks } from './constant';
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
    document.documentElement.classList.toggle('dark');
  }, [theme]);
  console.log(step, complete);
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
            <section className="mb-5 grid grid-cols-3 gap-2">
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
                <Input
                  field={inputs.fullName}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                />
                <Input
                  field={inputs.email}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                />
              </>
            )}
            {step === 2 && (
              <>
                <Input
                  field={inputs.userName}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                />
                <Input
                  field={inputs.password}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                />
              </>
            )}
            {step >= 3 && (
              <>
                <Select
                  field={inputs.theme}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                />
                <Checkbox
                  name="subscribe"
                  title="Subscribe to newsletter? "
                  onChange={onSubscribe}
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
