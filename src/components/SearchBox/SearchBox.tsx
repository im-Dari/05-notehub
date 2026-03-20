import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface Props {
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search notes"
      className={css.input} 
      onChange={handleChange}
    />
  );
}