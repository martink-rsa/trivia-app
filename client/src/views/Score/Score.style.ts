import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    background: #fff;
  }
  tr:first-of-type {
  }
  tr:nth-child(odd) {
    background: #e1e1e1;
  }
  tr {
    border-bottom: 1px solid black;
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
