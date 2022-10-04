import { sum } from "./second";

const root = document.querySelector('#root');

root.textContent = sum(1, 3).toString();