import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { decrease, increase } from '../store/balanceSlice';

const Ex3 = () => {
  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch<AppDispatch>();
  const [amount, setAmount] = useState<number>(0);

  const handleDecrease = () => {
    dispatch(decrease(amount));
    setAmount(0);
  };

  const handleIncrease = () => {
    dispatch(increase(amount));
    setAmount(0);
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          🏧 BALANCE Machine
        </h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Amount (€)
                </label>
                <input
                  id="amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDecrease}
                  className="flex-1 px-6 py-2 font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-700"
                >
                  💸 Decrease
                </button>
                <button
                  onClick={handleIncrease}
                  className="flex-1 px-6 py-2 font-medium text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700"
                >
                  💰 Increase
                </button>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">
                  Current Balance
                </p>
                <p className="text-3xl font-bold text-gray-800">{balance}€</p>
              </div>
              <div className="text-5xl">💳</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ex3;