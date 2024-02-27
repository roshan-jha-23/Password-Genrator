import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#%^&*(){}[]_-,.";

    for (let index = 1; index < length; index++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passRef = useRef(null);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
    alert("pass word copied")
  }, [password]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-300">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Password Generator
      </h1>
      <div className="w-full md:max-w-lg bg-blue-300 rounded-lg shadow-md p-8">
        <input
          type="text"
          value={password}
          className="w-full bg-gray-200 p-3 mb-4 rounded-lg focus:outline-none"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          onClick={copyPassword}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Copy Password
        </button>
        <div className="flex justify-between mt-4">
          <label className="text-gray-800">Length</label>
          <label className="text-gray-800">{length}</label>
        </div>
        <input
          onChange={(e) => setLength(e.target.value)}
          type="range"
          min={6}
          max={100}
          value={length}
          className="w-full mt-2 mb-4"
        />
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-gray-800 ml-2">
              Number
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput" className="text-gray-800 ml-2">
              Character
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
