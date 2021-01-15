import { useState } from 'react';
import { createList } from '../../apiService';
import { ListInterface } from '../../interfaces';
import './NewListModal.scss';

export interface NewListModalProps {
  listHasBeenAdded(list: ListInterface): void;
}

const NewListModal: React.FC<NewListModalProps> = ({ listHasBeenAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const newList = await createList(name);
    listHasBeenAdded(newList);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div className='new-list modal'>
      <h2>Create new list</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' onChange={handleChange} />
        <button className='btn is-dark mt-1'>Create</button>
      </form>
    </div>
  );
};

export default NewListModal;
