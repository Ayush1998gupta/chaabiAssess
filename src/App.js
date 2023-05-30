import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l'];
  const [text, setText] = useState('');
  const [randomWords, setRandomWords] = useState(generateRandomWords());
  const [accuracy, setAccuracy] = useState(0);
  const [time, setTime] = useState(0);
  const [keyCount, setKeyCount] = useState(0);
  const [kpm, setKpm] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (randomWords === text) {
      setRandomWords(generateRandomWords());
      setText('');
      setAccuracy(100);
      setKeyCount((prevKeyCount) => prevKeyCount + 1);
    }
  }, [text]);

  useEffect(() => {
    if (time >= 300) {
      setRandomWords('Your touch typing is complete.');
      setTime(300);
    }
  }, [time]);

  useEffect(() => {
    const minutesElapsed = Math.floor(time / 60) || 1;
    const kpm = keyCount / minutesElapsed;
    setKpm(Math.round(kpm * 5));
  }, [keyCount, time]);

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  function generateRandomWords() {
    let randomWords = '';

    for (let i = 0; i < 6; i++) {
      const key1 = keys[Math.floor(Math.random() * keys.length)];
      const key2 = keys[Math.floor(Math.random() * keys.length)];

      randomWords += key1 + key2 + ' ';
    }

    return randomWords.trim();
  }

  return (
    <>
      <div className='container'>
        <h1 className='heading'>Touch Typing</h1>
        <p className='keys'>{randomWords}</p>
        <input type='text' placeholder='Enter the keys' className='text' value={text} onChange={onChangeText} />
        <ul className='stats-container'>
          <li>KPM: {Number.isFinite(kpm) ? kpm : 0}</li>
          <li>Accuracy: {accuracy} %</li>
          <li>{formatTime(time)}</li>
        </ul>

      </div>
    </>
  );
};

export default App;
