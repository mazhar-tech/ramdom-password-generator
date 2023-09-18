import "./App.css";
import { useCallback, useState, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [lattersAllowed, setLattersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (lattersAllowed) str += "!#$%&'@-_()*+{}`~[]";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, lattersAllowed, setPassword]);

  const passwordRef = useRef(null)

  const passwordCopy = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, lattersAllowed, passwordGenerator]);
  return (
    <div className="App-header">
      <div className="container border rounded bg-dark  col-lg-5 my-5">
        <h3 className="h3">Password Generator</h3>
        <div className="input-group  my-3 ">
          <input
            type=""
            className="form-control"
            placeholder="Password Generator"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={password}
            ref={passwordRef}
          />
          <button className="btn btn-primary" type="button" id="button-addon2" onClick={passwordCopy}>
            Copy Password
          </button>
        </div>
        <div className="row  mx-2">
          <div className="col-lg-3">
            <input
              type="range"
              className="form-range "
              min={6}
              max={50}
              value={length}
              id="customRange1"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            ></input>
          </div>
          <div className="col-lg-3">length:{length}</div>
          <div class="form-check col-lg-3 text-light">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              defaultChecked={numbersAllowed}
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Numbers
            </label>
          </div>
          <div class="form-check col-lg-3 text-light">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              defaultChecked={lattersAllowed}
              onChange={() => {
                setLattersAllowed((prev) => !prev);
              }}
            />
            <label class="form-check-label" for="flexCheckChecked">
              Latters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
