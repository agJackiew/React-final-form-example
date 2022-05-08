import styled, { css } from 'styled-components';

const btn = (light, dark) => css`
  white-space: nowrap;
  display: flex;
  border-radius: 2.4rem;
  padding: 1rem 2rem;
  font-size: 1.3rem;
  color: white;
  text-transform: uppercase;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(${light}, ${dark});
  border: none;
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(${light}, ${dark});
    &[disabled] {
      background-image: linear-gradient(${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn(
    'var(--color-green-light)',
    'var(--color-green-dark)'
  )} color: var(--color-primary-dark);
`;

const btnPrimary = btn(
  'var(--color-primary-light)',
  'var(--color-primary-dark)'
);

export default styled.div`
  form,
  div.form {
    text-align: left;
    font-size: 1.2rem;
    width: 100%;
    margin: 1rem auto;
    margin-top: 6rem;
    border: 1px solid var(--color-primary-light);
    padding: 1rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
    background-color: var(--color-cream);
    position: relative;

    @media (min-width: 768px) {
      width: 50rem;
    }

    & > div {
      display: flex;
      flex-flow: column nowrap;

      margin: 1rem 0.5rem;
      position: relative;

      & > label {
        margin-left: 0.5rem;
        color: var(--color-secondary-dark);
        line-height: 3rem;
        text-transform: uppercase;
      }

      & > div {
        display: flex;
        flex-flow: column;
        align-items: center;

        & > input,
        & > select {
          width: 100%;
          padding: 0.8rem 1rem;
          background-color: var(--color-green-light);
          color: var(--color-primary-dark);
          font-size: 1.5rem;
          text-transform: uppercase;
          border: none;
          border-radius: 1.4rem;

          &::placeholder {
            color: var(--color-grey-dark);
            text-transform: initial;
            font-size: 1.2rem;
          }

          &:active,
          &:focus {
            background-color: var(--color-green-light);
            outline: 2px solid var(--color-primary-light);
            border: none;
          }

          &::-webkit-slider-runnable-track {
            width: 100%;
            height: 1rem;
            border-radius: 0.5rem;
            background-image: linear-gradient(
              to right,
              var(--color-primary-light),
              var(--color-yellow),
              var(--color-secondary-light)
            );
          }

          &::-webkit-slider-thumb {
            -webkit-appearance: none;

            height: 1.6rem;
            width: 1.6rem;
            border-radius: 50%;
            background: var(--color-green-light);
            cursor: pointer;
            margin-top: -3px;
            border: 1px solid var(--color-primary-light);
          }

          &::-moz-range-track {
            width: 100%;
            height: 1rem;
            border-radius: 0.5rem;
            background-image: linear-gradient(
              to right,
              var(--color-primary-light),
              var(--color-yellow),
              var(--color-secondary-light)
            );
          }
        }

        & > select {
          border-right: 0.5rem solid transparent !important;

          & > option {
            background-color: var(--color-green-light);
          }
        }

        & > input[type='range'] {
          -webkit-appearance: none;
          padding: 0.8rem 0 !important;
          background: transparent;

          &:focus,
          &:active {
            outline: none;
          }
        }

        & > span {
          line-height: 2.4rem;
          margin: 0 0.5rem;
          color: var(--color-secondary-light);
          font-weight: bold;
          text-align: center;
        }
      }
    }
    & > .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 2.4rem;
    }

    & > .message {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      font-size: 1.2rem;
    }

    .error {
      display: flex;
      font-weight: bold;
      color: var(--color-secondary-light);
      flex-flow: row nowrap;
      justify-content: center;
    }
  }
  button {
    margin: 0 2rem;
    &[type='submit'] {
      ${btnPrimary};
    }
    &[type='button'] {
      ${btnDefault};
    }
  }
`;
