import React, { FC, useState, useRef, useEffect } from 'react';
import { SelectFieldProps } from '../../interfaces/props';

const SelectField: FC<SelectFieldProps> = ({ options, fieldName, value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  const optionsUnique = options.filter((v, i, a) => a.indexOf(v) === i);

  useEffect(() => {
    const support = ['click', 'touchend']
    support.forEach(e => {
      document.addEventListener(e, toggle)
    })
    return () => support.forEach(e => {
      document.removeEventListener(e, toggle)
    })
  }, [])

  const filter = (optionsUnique: any[]) => {
    return optionsUnique && optionsUnique.filter(
      option =>
        option
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1
      )
  }

  const toggle = (e: Event): void => {
    setOpen(e && e.target === ref.current)
  }

  const selectOption = (option: string): void => {
    setQuery('')
    onChange(option)
    setOpen(false)
  }

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            type="text"
            ref={ref}
            placeholder={
              value ? value
              : (optionsUnique.length ? `Select a ${fieldName}...` : `No ${fieldName} available`)
            }
            value={value || query}
            onChange={e => {
              setQuery(e.target.value)
              onChange(null)
            }}
            onClick={() => setOpen(!open)}
            onTouchEnd={() => setOpen(!open)}
          />
        </div>
        {optionsUnique.length ? <div className={`arrow ${open && 'open'}`} /> : null}
      </div>
      <div className={`options ${open && 'open'}`}>
        {
          filter(optionsUnique).map(
            (option, index) =>
              <div
                key={index}
                className={`option ${value === option && 'selected'}`}
                onClick={() => selectOption(option)}
                onTouchEnd={() => selectOption(option)}
              >
                {option}
              </div>
          )
        }
      </div>
    </div>
  );
}

export default SelectField;
