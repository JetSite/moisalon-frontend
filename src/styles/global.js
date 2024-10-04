// eslint-disable-next-line import/no-anonymous-default-export
export default ` 
  box-sizing: border-box;
}

*, *:before, *:after {
  -webkit-appearance: none;
}

html {
  font-size: 62.5%;
  overflow-y: scroll;
}

body {
  font-family: "Montserrat";
  margin: 0;
  padding: 0;
  width: 100%;
  font-weight: normal;
  font-size: 1.6rem;
  overflow-y: auto;
  box-sizing: border-box;
}


body,
#root {
}

ul,
ol,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  padding: 0;
  margin: 0;
}

button {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

ul li,
nav li,
ol li {
  list-style: none;
}

a {
  text-decoration: none;
  color: black;
  text-decoration-color: inherit;
}

input {
  box-sizing: border-box;
}

.hidden,
.hide {
  display: none;
}
* {
  box-sizing: border-box;
}
.swiper-button-disabled {
  opacity: 0.2;
  cursor: default !important;
}
.chooseScroll {
  width: 1px !important;
  background: #000 !important;
  overflow: initial !important;
}
.chooseThumb {
  width: 12px !important;
  height: 12px !important;
  background: #F8F8F8 !important;
  border: 1px solid #000000 !important;
  position: absolute !important;
  right: -6px !important;
  border-radius: 100% !important;
}
[class*="ymaps-2"][class*="-ground-pane"] {
  filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
  /* Firefox 3.5+ */
  -webkit-filter: grayscale(100%);
  /* Chrome 19+ & Safari 6+ */
}
.ymaps-2-1-79-gototech {
  display: none!important;
}
`
