import React, { useEffect, useState } from 'react';
import styles from './user-card.module.scss';

const UserCard = ({
  userData,
  index,
  onDelete,
  onUpdate
}) => {
  const [editMode, setEditMode] = useState(false);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(userData);
    setInfo(userData);
  }, []);

  const onCancel = () =>{
    setEditMode(false);
    setInfo(userData);
  }

  const changeInfo = (value, field) => {
    setInfo({ ...info, [field]: value });
  };

  const onSave = () => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(info.name.length<3 || info.location.length<1 || !regexEmail.test(info.email)){
      setError(true);
    } else {
      setError(false);
      setEditMode(false);
      onUpdate(index, info)
    }
  };

  return (
    <div className={styles.root}>
      <>
        {info && Object.keys(info).map((field) => (
          <div key={field}>{
            field === 'image' ? <>
             <p>{`${field}: `}</p>
             <img src={info[field]}/>
            </>
            :
            (!editMode || field === 'uuid') ?
              <p>{`${field}: ${info[field]}`}</p>
              :
              (
                <div className={styles.row}>
                  <p className={styles.text}>{`${field}: `}</p>
                  <input
                    className={styles.input}
                    placeholder={field}
                    value={info[field]}
                    onChange={(e) => changeInfo(e.target.value, field)}
                  />
                </div>
              )
          }
          </div>
        ))}
      </>
      {error ? <span className={styles.validationErr}>*Not all inputs are valid*</span> : ''}
      {!editMode ? (
        <div>
          <button className={styles.button} onClick={() => setEditMode(true)}>
            Edit
          </button>
          <button className={styles.button} onClick={() => onDelete(index)}>Delete</button>
        </div>
      ) : (
        <>
          <button className={styles.button} onClick={() => onSave()}>
            Save
          </button>
          <button className={styles.button} onClick={() => onCancel()}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;

