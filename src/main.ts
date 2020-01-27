import models from "./*.glb";
import view from "./view";

const active = window.location.search.slice(1);

if (active && models[active]) {
  view(models[active]);
} else {
  Object.keys(models).forEach(model => {
    document.body.innerHTML += `<a href="/?${model}">${model}</a><br />`;
  });
}
