const [bal, setBal] = useState();

const [state, setState] = useState({
  komal: "",
  neel: [],
  jeff: 23,
});

console.warn(`${state.jeff}`);

setState({
    komal : "is brilliant"
})

console.warn(`${state.komal}`);