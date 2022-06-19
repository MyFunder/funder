import React from "react";
import styles from "./CreateForm.module.scss";
import btn from "../../styles/button.module.scss";

function CreateForm({ onClickCreate, submitting, completed }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Create a <span>Fundraiser</span>
      </h2>
      <form className={styles.form} onSubmit={onClickCreate}>
        <div className={styles.form__contain}>
          <label className={styles.form__label} htmlFor="name">
            Purpose
          </label>
          <input
            className={styles.form__input}
            required
            name="name"
            id="name"
            maxLength={32}
            type="text"
          />
          <label className={styles.form__label} htmlFor="amount">
            Amount(matic)
          </label>
          <input
            className={styles.form__input}
            required
            name="amount"
            id="amount"
            type="number"
          />

          <label className={styles.form__label} htmlFor="image">
            Image(url)
          </label>
          <input
            className={styles.form__input}
            required
            name="image"
            id="image"
            type="url"
          />

          <label className={styles.form__label} htmlFor="desc">
            Description
          </label>
          <textarea
            className={styles.form__textarea}
            required
            name="desc"
            id="desc"
            type="text"
          />

          <label className={styles.form__label} htmlFor="period">
            Due Date
          </label>
          <input
            className={styles.form__input}
            required
            name="period"
            id="period"
            type="date"
            min="1"
          />

          {!submitting ? (
            <button
              className={`${btn.btn} ${btn.btn__animated} ${btn.btn__blue} ${styles.form__btn}`}
              type="submit"
            >
              Create
            </button>
          ) : (
            <button
              className={`${btn.btn} ${btn.btn__transparent} ${styles.form__btn}`}
              disabled
            >
              Creating Fundraiser...
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
