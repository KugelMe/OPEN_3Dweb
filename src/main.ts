import models from "./*.glb";
import view from "./view";

const active = decodeURI(window.location.hash.substring(1));

if (active && models[active]) {
  view(models[active]);
} else {
  Object.keys(models).forEach(model => {
    document.body.innerHTML += `<a href="./#${encodeURI(
      model
    )}">${model}</a><br />`;
  });
}

window.addEventListener("hashchange", () => window.location.reload());
