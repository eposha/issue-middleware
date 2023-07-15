'use client';

import type { NextPage } from 'next';
import { useState } from 'react';

const Test: NextPage = () => {
  const [subscription, setSubscription] = useState(null);

  const subscribeButtonOnClick = async (event: {
    preventDefault: () => void;
  }) => {
    setSubscription('sub');
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={subscribeButtonOnClick} type='button'>
          Subscribe
        </button>
      </div>
    </>
  );
};

export default Test;
