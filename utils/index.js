export default price => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
