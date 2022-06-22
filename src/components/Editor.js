import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { add, edit } from '../app/contactsSlice';

import Card from './Card';

function Editor(props) {
  const
    db = useSelector((state) => state.contacts.db);
  const fixed = useSelector((state) => state.contacts.fixed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    data: props.new ? {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: ""
    } : props.fixed ? fixed[props.id] : db[props.id],
    verdict: {},  // tracks verdict of fields with RULES
    errors: {},   // tracks warning messages from field rules
  };
  const [form, updateForm] = useState(initialState);

  // rules convention:
  // { 
  //   [nameOfTheInput]:{
  //     [rule]: {
  //        check: Regex
  //        feedback: string
  //     } 
  //   }
  // }
  const rules = {
    firstName: {
      required: {
        check: /[\w]/,
        feedback: "First name is required."
      }
    },
    lastName: {
      required: {
        check: /[\w]/,
        feedback: "Last name is required."
      }
    },
    phoneNumber: {
      required: {
        check: /[\w]/,
        feedback: "Phone number is required."
      },
      format: {
        check: /^((\d){3}-){2}(\d){4}(?![\W\w\S\s])/,
        feedback: "Phone number must be in the format of xxx-xxx-xxxx."
      }
    },
    emailAddress: {
      format: {
        check: /^[\w.]+@+[\w]+\.{1}(com|org)+\b/,
        feedback: "Email address format is invalid."
      }
    }
  }

  let timer;

  function handleUpdateField(e) {
    const { name, value } = e.target;
    const edits = {
      data: {}, verdict: {}, errors: {}
    };

    edits.data[name] = value;

    if (rules[name]?.required || value.length) {
      const { verdict, error } = validateField(name, value);
      edits.verdict[name] = verdict
      edits.errors[name] = error
    } else {
      edits.verdict[name] = true
      edits.errors[name] = undefined
    }

    const newCopy = {
      data: { ...form.data, ...edits.data },
      verdict: { ...form.verdict, ...edits.verdict },
      errors: { ...form.errors, ...edits.errors },
    };

    updateForm(newCopy);
  }

  // this function is partially written to support multiple warning messages per field
  // to adapt for this, the warning state needs to be updated to a map
  function validateField(field, value) {
    const rulesArr = Object.values(rules[field]);
    let verdict = true;
    let error = []

    // checks against ALL rules for the particular field
    for (const { check, feedback } of rulesArr) {
      const resultOfCheck = check.test(value)
      verdict = verdict && resultOfCheck

      // if result is false, update message with warning
      !resultOfCheck && error.push(feedback)
    }

    if (!error.length) { error = undefined }
    return { verdict, error }
  }

  function checkGlobalVerdict() {
    const data = Object.entries(form.data);
    const edits = {
      data: {}, verdict: {}, errors: {}
    };


    for (const [name, value] of data) {
      if (rules[name]?.required || value.length) {
        const { verdict, error } = validateField(name, value);
        edits.verdict[name] = verdict
        edits.errors[name] = error
      }
    }


    const verdicts = Object.values(edits.verdict);
    const globalVerdict = verdicts.reduce((prev, cur) => prev && cur, true)
    return { edits, globalVerdict }
  }

  function handleSave() {
    const { edits, globalVerdict } = checkGlobalVerdict()

    if (globalVerdict) {
      dispatch(edit({ id: props.id, data: form.data, custom: props?.fixed }));
      forceAddNotifs("Changes have been saved.");
    }
    else {
      const newCopy = {
        data: { ...form.data, ...edits.data },
        verdict: { ...form.verdict, ...edits.verdict },
        errors: { ...form.errors, ...edits.errors },
      };
      updateForm(newCopy)
    }
  }
  function handleCreate() {
    const { edits, globalVerdict } = checkGlobalVerdict()
    if (globalVerdict) {
      dispatch(add({ data: form.data }))
      navigate("/", { replace: true })
    }
    else {
      const newCopy = {
        data: { ...form.data, ...edits.data },
        verdict: { ...form.verdict, ...edits.verdict },
        errors: { ...form.errors, ...edits.errors },
      };
      updateForm(newCopy)
    }
  }
  function handleCancel() {
    window.history.back()
  }

  // force add notification to form feedback (expires in 3 seconds)
  function forceAddNotifs(message) {
    const txt = document.createTextNode(message)
    const p = document.createElement("p");

    p.setAttribute("class", "saved")
    p.appendChild(txt)
    document.getElementById("notifs").appendChild(p)

    timer = setTimeout(forceClearNotifs, 3000)
  }
  // force clear notification
  function forceClearNotifs() {
    Array.from(document.getElementById("notifs").children).forEach(child => child.remove())
    clearTimeout(timer)
  }

  function renderWarning() {
    const warnings = Object.values(form.errors);

    return <>{
      warnings?.map((group, i) => <React.Fragment key={`group-${i}`}>{
        group !== undefined && Array.isArray(group)
          ? <ul>{
            group?.map((warn, i) => <li key={`warn-${i}`}>
              {warn}
            </li>)
          }</ul>
          : null
      }</React.Fragment>)
    }</>;
  }

  useEffect(() => {
  }, []);
  return (
    <div className="editor">
      <form onSubmit={(e) => e.preventDefault()}>
        <input name="firstName" className={form?.verdict?.firstName?.toString()} type="text" placeholder="First Name" value={form.data.firstName} onChange={handleUpdateField} />
        <input name="lastName" className={form?.verdict?.lastName?.toString()} type="text" placeholder="Last Name" value={form.data.lastName} onChange={handleUpdateField} />
        <input name="phoneNumber" className={form?.verdict?.phoneNumber?.toString()} type="tel" placeholder="Phone Number (required)" value={form.data.phoneNumber} onChange={handleUpdateField} />
        <input name="emailAddress" className={form?.verdict?.emailAddress?.toString()} type="email" placeholder="Email Address" value={form.data.emailAddress} onChange={handleUpdateField} />

        <div className="buttons">
          <input type="button" value="cancel" onClick={handleCancel} />
          {props.new
            ? <input type="button" className={(!checkGlobalVerdict().globalVerdict).toString()} value='create contact' onClick={handleCreate} />
            : <input type="button" className={(!checkGlobalVerdict().globalVerdict).toString()} value='save changes' onClick={handleSave} />
          }

        </div>
      </form>
      <div className="preview">
        <Card id={props.id} fixed={props.fixed} expanded deactivate={{ actions: true, shortcuts: true }} {...form.data} />
        <div id="notifs" role="alert">
          {renderWarning()}
        </div>
      </div>
    </div>
  );
}

export default Editor;
