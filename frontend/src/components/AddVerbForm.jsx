import React, {useState} from "react";

function AddVerbForm() {
    const [infinitive, setInfinitive] = useState();

    function handleChange(event) {
        setInfinitive(event.target.value);
    }

    return (
      <div>
          <input
              type="text"
              name="infinitive"
              placeholder="Verb"
              value={infinitive}
              onChange={handleChange}
          />
      </div>
    );
}

export {AddVerbForm}