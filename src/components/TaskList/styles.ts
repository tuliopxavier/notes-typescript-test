import styled from 'styled-components';

export const Section = styled.section`
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 375px;

      & input {
        width: 50%;
        margin: 0;
      }

      & button {
        transition: all 0.25s ease;
      }
    }

    & small {
      color: #f77;
    }
  }

  ul {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const Task = styled.li`
  display: flex;

  justify-content: space-between;
  margin: 1rem 0;
  width: 90%;
  transition: filter 0.25s ease;

  &:hover {
    background-color: var(--accent-bg);
  }

  & article {
    display: flex;
    align-items: top;

    gap: 1rem;
    margin-right: 2rem;

    & p {
      margin: 0;
      transition: all 0.25s ease;
    }
  }

  & button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;
    padding: 0.1rem;
    margin: 0.25rem 0 0;
  }

  .completed {
    & p {
      text-decoration: line-through;
      opacity: 0.5;
      filter: blur(1px);
    }
  }
`;
