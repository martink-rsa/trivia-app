import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    background-color: #fff;
  }
  tr:first-of-type {
  }
  tr:nth-child(odd) {
    background-color: rgba(81, 182, 254, 0.19);
  }
  tr {
    border-bottom: 1px solid ${(props) => props.theme.color.primary};
  }
  td {
    padding: 4px 0;
  }

  /* @media (max-width: 280px) {
    font-size: 10px;
    th:nth-child(2) {
      background: red;
      display: none;
    }
    td:nth-child(2) {
      background: red;
      display: none;
    }
  } */
`;
