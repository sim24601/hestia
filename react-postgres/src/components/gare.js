
const [gares, setGares] = useState(false);
useEffect(() => {
  getGare();
}, []);
function getGare() {
  fetch('http://localhost:3001')
    .then(response => {
      return response.text();
    })
    .then(data => {
      setGares(data);
    });
}
return (
  <div>
    {gares ? gares : 'There is no data available'}
    <br />
  </div>
  );